import Application from "../models/Application.js";

export const getStudentCalendar = async(req, res) => {
    try {
        const studentId = req.user.id;

        console.log("Logged Student:", studentId);

        const allApps = await Application.find({
            student: studentId,
        });

        console.log("All Applications:", allApps.length);

        const interviewApps = await Application.find({
            student: studentId,
            interviewDate: { $ne: null },
        });

        console.log(
            "Interview Applications:",
            interviewApps.length
        );

        res.json({
            success: true,
            count: interviewApps.length,
            events: interviewApps,
        });
    } catch (err) {
        console.error(err);
    }
};

