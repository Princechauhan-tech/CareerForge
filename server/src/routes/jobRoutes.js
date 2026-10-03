import express from "express";

import {
    getJobs,
    getJobById,
    getFeaturedJobs,
    getJobFilterOptions,
} from "../controllers/jobController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Featured Jobs
|--------------------------------------------------------------------------
*/

router.get(
    "/featured",
    getFeaturedJobs
);

/*
|--------------------------------------------------------------------------
| Filter Metadata
|--------------------------------------------------------------------------
*/

router.get(
    "/meta/filters",
    getJobFilterOptions
);

/*
|--------------------------------------------------------------------------
| All Jobs / Search / Filters
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    getJobs
);

/*
|--------------------------------------------------------------------------
| Single Job
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    getJobById
);

export default router;