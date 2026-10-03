import express from "express";

import {
    createCompanyJob,
    getCompanyJobs,
    getCompanyJobById,
    updateCompanyJob,
    updateCompanyJobStatus,
    deleteCompanyJob,
} from "../controllers/companyJobController.js";

import {
    verifyToken,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// ============================================================
// COMPANY JOB MANAGEMENT
// ============================================================

router.get(
    "/",
    verifyToken,
    authorizeRoles("Company"),
    getCompanyJobs
);

router.post(
    "/",
    verifyToken,
    authorizeRoles("Company"),
    createCompanyJob
);

router.get(
    "/:id",
    verifyToken,
    authorizeRoles("Company"),
    getCompanyJobById
);

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("Company"),
    updateCompanyJob
);

router.patch(
    "/:id/status",
    verifyToken,
    authorizeRoles("Company"),
    updateCompanyJobStatus
);

router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("Company"),
    deleteCompanyJob
);

export default router;
