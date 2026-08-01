import Application from "../models/Application.js";
import Job from "../models/Job.js";
import Company from "../models/Company.js";
import { io } from "../../server.js";

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

/*
========================================
Apply Job
POST /api/applications/:jobId
Private (Student)
========================================
*/
export const applyJob = async(req, res) => {
    try {
        const { jobId } = req.params;
        const { resume, coverLetter } = req.body;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

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

        // Real Time Notification
        if (io) {
            io.emit("newApplication", {
                message: "New job application received",
                applicantId: req.user.id,
                jobId: job._id,
                companyId: job.company,
            });
        }

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

/*
========================================
Schedule Interview
PUT /api/applications/schedule/:applicationId
Private (Company)
========================================
*/
export const scheduleInterview = async(req, res) => {
    try {
        const { applicationId } = req.params;

        const {
            interviewDate,
            interviewMode,
            interviewLink,
            interviewLocation,
        } = req.body;

        const application = await Application.findById(
            applicationId
        );

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found",
            });
        }

        application.interviewDate = interviewDate;
        application.interviewMode = interviewMode;
        application.interviewLink = interviewLink || "";
        application.interviewLocation =
            interviewLocation || "";

        application.status =
            "Interview Scheduled";

        await application.save();

        // Real Time Notification
        if (io) {
            io.emit("interviewScheduled", {
                message: "Interview scheduled successfully",
                applicationId,
                interviewDate,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Interview scheduled successfully",
            application,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};