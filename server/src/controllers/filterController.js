import Job from "../models/Job.js";

export const filterJobs = async(req, res) => {
    try {

        const {
            location,
            jobType,
            experienceLevel,
        } = req.query;

        let filter = {};

        if (location) {
            filter.location = location;
        }

        if (jobType) {
            filter.jobType = jobType;
        }

        if (experienceLevel) {
            filter.experienceLevel = experienceLevel;
        }

        const jobs = await Job.find(filter);

        return res.status(200).json({
            success: true,
            count: jobs.length,
            jobs,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

