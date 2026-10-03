import Application from "../models/Application.js";

/*
========================================
Student Dashboard
GET /api/student/dashboard
Private (Student)
========================================
*/

export const getStudentDashboard = async(req, res) => {
    try {

        const applications = await Application.find({
                applicant: req.user.id,
            })
            .populate("job", "title location")
            .populate("company", "companyName logo");

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

        const recentApplications = applications
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 5);

        return res.status(200).json({
            success: true,
            dashboard: {
                totalApplications,
                pendingApplications,
                acceptedApplications,
                rejectedApplications,
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

