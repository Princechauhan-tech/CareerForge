import express from "express";

import {
    registerUser,
    loginUser,
    getProfile,
    studentDashboard,
    companyDashboard,
    adminDashboard,
} from "../controllers/authController.js";

import {
    verifyToken,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes
router.get("/profile", verifyToken, getProfile);

// Student Only
router.get(
    "/student",
    verifyToken,
    authorizeRoles("Student"),
    studentDashboard
);

// Company Only
router.get(
    "/company",
    verifyToken,
    authorizeRoles("Company"),
    companyDashboard
);

// Admin Only
router.get(
    "/admin",
    verifyToken,
    authorizeRoles("Admin"),
    adminDashboard
);

export default router;