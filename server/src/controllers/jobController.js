import cache from "../services/cacheService.js";
import Job from "../models/Job.js";
import Company from "../models/Company.js";

/*
========================================
Create Job
POST /api/jobs
Private (Company)
========================================
*/

export const createJob = async(req, res) => {
    try {
        const {
            title,
            description,
            location,
            jobType,
            experienceLevel,
            salary,
            skills,
            vacancies,
            applicationDeadline,
        } = req.body;

        // Find company of logged in user
        const company = await Company.findOne({
            owner: req.user.id,
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company profile not found",
            });
        }

        // Create Job
        const job = await Job.create({
            title,
            description,
            company: company._id,
            createdBy: req.user.id,
            location,
            jobType,
            experienceLevel,
            salary,
            skills,
            vacancies,
            applicationDeadline,
        });
        cache.del("allJobs");
        console.log("🗑 Cache Cleared");

        return res.status(201).json({
            success: true,
            message: "Job created successfully",
            job,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
/*
========================================
Update Job
PUT /api/jobs/:id
Private (Company)
========================================
*/

export const updateJob = async(req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        cache.del("allJobs");
        console.log("🗑 Cache Cleared");
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // Sirf jis company ne job create ki hai wahi update kar sakti hai
        if (job.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body, {
                new: true,
                runValidators: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Job updated successfully",
            job: updatedJob,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
========================================
Delete Job
DELETE /api/jobs/:id
Private (Company)
========================================
*/

export const deleteJob = async(req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        cache.del("allJobs");
        console.log("🗑 Cache Cleared");
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // Sirf owner delete kar sakta hai
        if (job.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        await Job.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
/*
========================================
Get All Jobs
GET /api/jobs
Public
========================================
*/
export const getAllJobs = async(req, res) => {
    try {

        console.log("Cache Keys:", cache.keys());

        const cachedJobs = cache.get("allJobs");

        if (cachedJobs) {
            console.log("⚡ Jobs fetched from Cache");

            return res.status(200).json({
                success: true,
                source: "cache",
                count: cachedJobs.length,
                jobs: cachedJobs,
            });
        }

        const jobs = await Job.find()
            .populate("company")
            .sort({ createdAt: -1 });

        cache.set("allJobs", jobs);

        console.log("✅ Cache Saved");
        console.log("📦 Jobs fetched from Database");

        return res.status(200).json({
            success: true,
            source: "database",
            count: jobs.length,
            jobs,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
========================================
Get Single Job
GET /api/jobs/:id
Public
========================================
*/
export const getSingleJob = async(req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate("company");

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        return res.status(200).json({
            success: true,
            job,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
========================================
Get Company Jobs
GET /api/jobs/company/my-jobs
Private
========================================
*/
export const getCompanyJobs = async(req, res) => {
    try {
        const company = await Company.findOne({
            owner: req.user.id,
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company profile not found",
            });
        }

        const jobs = await Job.find({
            company: company._id,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: jobs.length,
            jobs,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};