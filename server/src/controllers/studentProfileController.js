import User from "../models/User.js";

/*
========================================
Get Student Profile
GET /api/student/profile
Private (Student)
========================================
*/

export const getStudentProfile = async(req, res) => {
    try {

        const student = await User.findById(req.user.id)
            .select("-password");

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
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
========================================
Update Student Profile
PUT /api/student/profile
Private (Student)
========================================
*/

export const updateStudentProfile = async(req, res) => {
    try {

        const student = await User.findByIdAndUpdate(
            req.user.id,
            req.body, {
                new: true,
                runValidators: true,
            }
        ).select("-password");

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
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};