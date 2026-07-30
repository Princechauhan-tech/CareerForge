import User from "../models/User.js";

export const uploadResume = async(req, res) => {
    try {

        const student = await User.findById(req.user.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        if (req.file) {
            student.resume = req.file.path;
        }

        await student.save();

        return res.status(200).json({
            success: true,
            message: "Resume uploaded successfully",
            resume: student.resume,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};