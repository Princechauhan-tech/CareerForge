import express from "express";
import upload from "../middlewares/upload.js";

import { uploadResume } from "../controllers/resumeController.js";

import {
    verifyToken,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

/*
========================================
Upload Resume
PUT /api/student/resume
Private (Student)
========================================
*/

router.put(
    "/resume",
    verifyToken,
    authorizeRoles("Student"),
    upload.single("resume"),
    uploadResume
);

export default router;