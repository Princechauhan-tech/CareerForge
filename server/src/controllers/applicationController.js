import Application from "../models/Application.js";
import Job from "../models/Job.js";
import Company from "../models/Company.js";

/*
========================================
Apply Job
POST /api/applications/:jobId
Private (Student)
========================================
*/
/*
========================================
My Applications
GET /api/applications/my-applications
Private (Student)
========================================
*/

export const getMyApplications = async(req, res) => {
    try {

        const applications = await Application.find({
                applicant: req.user.id,
            })
            .populate("job")
            .populate("company")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: applications.length,
            applications,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const applyJob = async(req, res) => {
    try {
        const { jobId } = req.params;

        const { resume, coverLetter } = req.body;

        // Check Job
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // Check Duplicate Application
        const alreadyApplied = await Application.findOne({
            job: jobId,
            applicant: req.user.id,
        });

        if (alreadyApplied) {
            return res.status(400).json({
                success: false,
                message: "You already applied for this job.",
            });
        }
        const application = await Application.create({
            job: job._id,
            applicant: req.user.id,
            company: job.company,
            resume,
            coverLetter,
        });

        return res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            application,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};