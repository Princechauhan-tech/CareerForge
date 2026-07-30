import upload from "../middlewares/upload.js";
import express from "express";

import {
    createCompany,
    getCompanyProfile,
    updateCompany,
    getAllCompanies,
    deleteCompany,
} from "../controllers/companyController.js";

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

// Get All Companies
router.get("/", getAllCompanies);

/*
========================================
Company Protected Routes
========================================
*/

// Create Company Profile
router.post(
    "/",
    verifyToken,
    authorizeRoles("Company"),
    upload.single("logo"),
    createCompany
);
// Get Company Profile
router.get(
    "/profile",
    verifyToken,
    authorizeRoles("Company"),
    getCompanyProfile
);

// Update Company Profile
router.put(
    "/profile",
    verifyToken,
    authorizeRoles("Company"),
    upload.single("logo"),
    updateCompany
);

/*
========================================
Delete Company
========================================
*/

router.delete(
    "/profile",
    verifyToken,
    authorizeRoles("Company"),
    deleteCompany
);

export default router;