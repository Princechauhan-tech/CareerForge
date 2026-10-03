import express from "express";

import {
    getMyCompany,
    createCompany,
    updateCompany,
    deleteCompany,
} from "../controllers/companyController.js";

import {
    verifyToken,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// ============================================================
// COMPANY PROFILE
// ============================================================

router.get(
    "/profile",
    verifyToken,
    authorizeRoles("Company"),
    getMyCompany
);

router.post(
    "/profile",
    verifyToken,
    authorizeRoles("Company"),
    createCompany
);

router.put(
    "/profile",
    verifyToken,
    authorizeRoles("Company"),
    updateCompany
);

router.delete(
    "/profile",
    verifyToken,
    authorizeRoles("Company"),
    deleteCompany
);

export default router;
