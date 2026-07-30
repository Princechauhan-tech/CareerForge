import express from "express";

import {
    applyJob,
    getMyApplications,
} from "../controllers/applicationController.js";

import {
    verifyToken,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

/*
========================================
Student Routes
========================================
*/

// Apply Job
router.post(
    "/:jobId",
    verifyToken,
    authorizeRoles("Student"),
    applyJob
);

// My Applications
router.get(
    "/my-applications",
    verifyToken,
    authorizeRoles("Student"),
    getMyApplications
);

export default router;