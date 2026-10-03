import express from "express";

import {
    getCompanyApplications,
    getCompanyApplicationById,
    updateApplicationStatus,
    scheduleInterview,
    updateInterview,
    cancelInterview,
} from "../controllers/companyApplicationController.js";

import {
    verifyToken,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// ============================================================
// COMPANY APPLICATIONS
// ============================================================

router.get(
    "/",
    verifyToken,
    authorizeRoles("Company"),
    getCompanyApplications
);

router.get(
    "/:id",
    verifyToken,
    authorizeRoles("Company"),
    getCompanyApplicationById
);

router.patch(
    "/:id/status",
    verifyToken,
    authorizeRoles("Company"),
    updateApplicationStatus
);

// ============================================================
// INTERVIEW MANAGEMENT
// ============================================================

router.post(
    "/:id/interview",
    verifyToken,
    authorizeRoles("Company"),
    scheduleInterview
);

router.put(
    "/:id/interview",
    verifyToken,
    authorizeRoles("Company"),
    updateInterview
);

router.delete(
    "/:id/interview",
    verifyToken,
    authorizeRoles("Company"),
    cancelInterview
);

export default router;
