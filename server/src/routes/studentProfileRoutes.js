import express from "express";

import {
    getStudentProfile,
    updateStudentProfile,
} from "../controllers/studentProfileController.js";

import {
    verifyToken,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

/*
========================================
Student Profile
========================================
*/

// Get Profile
router.get(
    "/profile",
    verifyToken,
    authorizeRoles("Student"),
    getStudentProfile
);

// Update Profile
router.put(
    "/profile",
    verifyToken,
    authorizeRoles("Student"),
    updateStudentProfile
);

export default router;