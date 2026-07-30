import express from "express";

import {
    createJob,
    updateJob,
    deleteJob,
    getAllJobs,
    getSingleJob,
    getCompanyJobs,
} from "../controllers/jobController.js";

import {
    verifyToken,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

/*
========================================
Public Routes
========================================
*/

// Get All Jobs
router.get("/", getAllJobs);

// Get Single Job
router.get("/:id", getSingleJob);
/*
========================================
Company Protected Routes
========================================
*/

// Create Job
router.post(
    "/",
    verifyToken,
    authorizeRoles("Company"),
    createJob
);

// Get Company Jobs
router.get(
    "/company/my-jobs",
    verifyToken,
    authorizeRoles("Company"),
    getCompanyJobs
);

// Update Job
router.put(
    "/:id",
    verifyToken,
    authorizeRoles("Company"),
    updateJob
);

// Delete Job
router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("Company"),
    deleteJob
);

export default router;