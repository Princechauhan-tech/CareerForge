import express from "express";

import {
    getStudentProfile,
    updateStudentProfile,
    uploadProfileImage,
    uploadResume,
} from "../controllers/studentProfileController.js";

import {
    verifyToken,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";

import upload from "../middlewares/upload.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Student Profile
|--------------------------------------------------------------------------
*/

// GET PROFILE
router.get(
    "/profile",
    verifyToken,
    authorizeRoles("Student"),
    getStudentProfile
);

// UPDATE PROFILE
router.put(
    "/profile",
    verifyToken,
    authorizeRoles("Student"),
    updateStudentProfile
);

// UPLOAD PROFILE IMAGE
router.post(
    "/profile/image",
    verifyToken,
    authorizeRoles("Student"),
    upload.single("profileImage"),
    uploadProfileImage
);

// UPLOAD RESUME
router.post(
    "/profile/resume",
    verifyToken,
    authorizeRoles("Student"),
    upload.single("resume"),
    uploadResume
);

export default router;