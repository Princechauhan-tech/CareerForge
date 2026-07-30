import express from "express";
import { getStudentDashboard } from "../controllers/studentController.js";
import {
    verifyToken,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
    "/dashboard",
    verifyToken,
    authorizeRoles("Student"),
    getStudentDashboard
);

export default router;