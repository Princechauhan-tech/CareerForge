import express from "express";

import { getCompanyDashboard } from "../controllers/companyDashboardController.js";

import {
    verifyToken,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

/*
========================================
Company Dashboard
GET /api/company/dashboard
Private (Company)
========================================
*/

router.get(
    "/dashboard",
    verifyToken,
    authorizeRoles("Company"),
    getCompanyDashboard
);

export default router;