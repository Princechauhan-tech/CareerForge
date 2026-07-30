import express from "express";
import { getResume } from "../controllers/resumeViewerController.js";

import {
    verifyToken,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

/*
========================================
Get Resume
GET /api/student/resume
Private (Student)
========================================
*/

router.get(
    "/resume",
    verifyToken,
    authorizeRoles("Student"),
    getResume
);

export default router;