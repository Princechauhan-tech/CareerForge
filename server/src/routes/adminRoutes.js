import express from "express";

import { getAdminDashboard } from "../controllers/adminController.js";

import {
    verifyToken,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

/*
========================================
Admin Dashboard
GET /api/admin/dashboard
Private (Admin)
========================================
*/

router.get(
    "/dashboard",
    verifyToken,
    authorizeRoles("Admin"),
    getAdminDashboard
);

export default router;