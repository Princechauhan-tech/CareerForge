import express from "express";
import { searchJobs } from "../controllers/searchController.js";

const router = express.Router();

/*
========================================
Search Jobs
GET /api/search/jobs
========================================
*/

router.get("/jobs", searchJobs);

export default router;