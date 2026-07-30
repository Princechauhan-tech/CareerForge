import User from "../models/User.js";
import Company from "../models/Company.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

/*
========================================
Admin Dashboard
GET /api/admin/dashboard
Private (Admin)
========================================
*/

export const getAdminDashboard = async(req, res) => {
    try {

        const totalUsers = await User.countDocuments();

        const totalStudents = await User.countDocuments({
            role: "Student",
        });

        const totalCompanies = await Company.countDocuments();

        const totalJobs = await Job.countDocuments();

        const totalApplications = await Application.countDocuments();
        // Recent Users
        const recentUsers = await User.find()
            .select("-password")
            .sort({ createdAt: -1 })
            .limit(5);

        // Recent Jobs
        const recentJobs = await Job.find()
            .populate("company", "companyName")
            .sort({ createdAt: -1 })
            .limit(5);

        return res.status(200).json({
            success: true,
            dashboard: {
                totalUsers,
                totalStudents,
                totalCompanies,
                totalJobs,
                totalApplications,
                recentUsers,
                recentJobs,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};