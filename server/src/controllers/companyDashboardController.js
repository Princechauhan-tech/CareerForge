import Company from "../models/Company.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

/*
========================================
Company Dashboard
GET /api/company/dashboard
Private (Company)
========================================
*/

export const getCompanyDashboard = async(req, res) => {
    try {

        // Find Company
        const company = await Company.findOne({
            owner: req.user.id,
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company profile not found",
            });
        }

        // Company Jobs
        const jobs = await Job.find({
            company: company._id,
        });

        const totalJobs = jobs.length;
        // Total Applications
        const applications = await Application.find({
                company: company._id,
            })
            .populate("job", "title")
            .populate("applicant", "name email");

        const totalApplications = applications.length;

        const pendingApplications = applications.filter(
            app => app.status === "Pending"
        ).length;

        const acceptedApplications = applications.filter(
            app => app.status === "Accepted"
        ).length;

        const rejectedApplications = applications.filter(
            app => app.status === "Rejected"
        ).length;

        // Recent Jobs
        const recentJobs = await Job.find({
                company: company._id,
            })
            .sort({ createdAt: -1 })
            .limit(5);

        // Recent Applications
        const recentApplications = applications
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 5);

        return res.status(200).json({
            success: true,
            dashboard: {
                totalJobs,
                totalApplications,
                pendingApplications,
                acceptedApplications,
                rejectedApplications,
                recentJobs,
                recentApplications,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};