import Job from "../models/Job.js";

export const getPaginatedJobs = async(req, res) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const jobs = await Job.find()
            .skip(skip)
            .limit(limit);

        const totalJobs = await Job.countDocuments();

        return res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalJobs / limit),
            totalJobs,
            jobs,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};