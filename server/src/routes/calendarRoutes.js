import express from "express";

import {
    verifyToken,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";

import {
    getStudentCalendar,
} from "../controllers/calendarController.js";

const router = express.Router();

router.get(
    "/student",
    verifyToken,
    authorizeRoles("Student"),
    getStudentCalendar
);

export default router;