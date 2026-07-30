import Job from "../models/Job.js";

export const searchJobs = async(req, res) => {
    try {

        const keyword = req.query.keyword || "";

        const jobs = await Job.find({
            title: {
                $regex: keyword,
                $options: "i",
            },
        });

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