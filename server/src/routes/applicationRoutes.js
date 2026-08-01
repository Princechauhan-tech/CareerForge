import express from "express";

import {
    applyJob,
    getMyApplications,
    scheduleInterview,
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
/*
========================================
Schedule Interview
PUT /api/applications/schedule/:applicationId
Private (Company)
========================================
*/

router.put(
    "/schedule/:applicationId",
    verifyToken,
    authorizeRoles("Company"),
    scheduleInterview
);
export default router;