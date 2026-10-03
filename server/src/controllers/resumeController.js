import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

export const uploadResume = async(req, res, next) => {
    try {

        const student = await User.findById(req.user.id);

        if (!student) {
            return next(new ApiError(404, "Student not found"));
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
        next(error);
    }
};

