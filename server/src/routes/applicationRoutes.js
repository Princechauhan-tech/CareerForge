import express from "express";

import {
    verifyToken,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";

import {
    applyForJob,
    getMyApplications,
    getApplicationById,
    withdrawApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

// =====================================================
// STUDENT APPLICATIONS
// =====================================================

// -----------------------------------------------------
// APPLY FOR JOB
// POST /api/applications/:jobId
// -----------------------------------------------------

router.post(
    "/:jobId",
    verifyToken,
    authorizeRoles("Student"),
    applyForJob
);

// -----------------------------------------------------
// MY APPLICATIONS
// GET /api/applications/my
// -----------------------------------------------------

router.get(
    "/my",
    verifyToken,
    authorizeRoles("Student"),
    getMyApplications
);

// -----------------------------------------------------
// GET SINGLE APPLICATION
// GET /api/applications/:id
// -----------------------------------------------------

router.get(
    "/:id",
    verifyToken,
    authorizeRoles("Student"),
    getApplicationById
);

// -----------------------------------------------------
// WITHDRAW APPLICATION
// DELETE /api/applications/:id/withdraw
// -----------------------------------------------------

router.delete(
    "/:id/withdraw",
    verifyToken,
    authorizeRoles("Student"),
    withdrawApplication
);

export default router;