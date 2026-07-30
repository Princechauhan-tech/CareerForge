import User from "../models/User.js";

export const getResume = async(req, res) => {
    try {

        const student = await User.findById(req.user.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        return res.status(200).json({
            success: true,
            resume: student.resume,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};