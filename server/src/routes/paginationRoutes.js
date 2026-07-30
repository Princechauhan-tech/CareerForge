import express from "express";
import { getPaginatedJobs } from "../controllers/paginationController.js";

const router = express.Router();

/*
========================================
Pagination Jobs
GET /api/pagination/jobs
========================================
*/

router.get("/jobs", getPaginatedJobs);

export default router;