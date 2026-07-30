import express from "express";
import { filterJobs } from "../controllers/filterController.js";

const router = express.Router();

/*
========================================
Filter Jobs
GET /api/filter/jobs
========================================
*/

router.get("/jobs", filterJobs);

export default router;