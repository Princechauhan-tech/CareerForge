import User from "../models/User.js";

/*
|--------------------------------------------------------------------------
| GET STUDENT PROFILE
|--------------------------------------------------------------------------
*/

export const getStudentProfile = async(req, res) => {
    try {
        const student = await User.findById(req.user.id)
            .select("-password -verificationToken");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        return res.status(200).json({
            success: true,
            student,
        });
    } catch (error) {
        console.error("GET STUDENT PROFILE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
|--------------------------------------------------------------------------
| UPDATE STUDENT PROFILE
|--------------------------------------------------------------------------
*/

export const updateStudentProfile = async(req, res) => {
    try {
        const allowedFields = [
            "name",
            "email",
            "phone",
            "location",
            "headline",
            "bio",
            "skills",
            "education",
            "experience",
            "portfolio",
            "github",
            "linkedin",
        ];

        const updateData = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        const student = await User.findByIdAndUpdate(
            req.user.id,
            updateData, {
                new: true,
                runValidators: true,
            }
        ).select("-password -verificationToken");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student profile updated successfully",
            student,
        });
    } catch (error) {
        console.error("UPDATE STUDENT PROFILE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
|--------------------------------------------------------------------------
| UPLOAD PROFILE IMAGE
|--------------------------------------------------------------------------
*/

export const uploadProfileImage = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please select a profile image.",
            });
        }

        const student = await User.findByIdAndUpdate(
            req.user.id, {
                profileImage: req.file.path,
            }, {
                new: true,
                runValidators: true,
            }
        ).select("-password -verificationToken");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile image uploaded successfully",
            student,
        });
    } catch (error) {
        console.error("PROFILE IMAGE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
|--------------------------------------------------------------------------
| UPLOAD RESUME
|--------------------------------------------------------------------------
*/

export const uploadResume = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please select a resume.",
            });
        }

        const student = await User.findByIdAndUpdate(
            req.user.id, {
                resume: req.file.path,
            }, {
                new: true,
                runValidators: true,
            }
        ).select("-password -verificationToken");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Resume uploaded successfully",
            student,
            resume: req.file.path,
        });
    } catch (error) {
        console.error("RESUME UPLOAD ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

