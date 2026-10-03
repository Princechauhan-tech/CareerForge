import express from "express";

import {
    getCompanyDashboard,
} from "../controllers/companyDashboardController.js";

import {
    verifyToken,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
    "/dashboard",
    verifyToken,
    authorizeRoles("Company"),
    getCompanyDashboard
);

export default router;
