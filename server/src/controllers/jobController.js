import Job from "../models/Job.js";

/*
|--------------------------------------------------------------------------
| Helper
|--------------------------------------------------------------------------
*/

const escapeRegex = (value = "") => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const normalizeSkills = (skills) => {
    if (!skills) return [];

    if (Array.isArray(skills)) {
        return skills
            .map((skill) => String(skill).trim())
            .filter(Boolean);
    }

    return String(skills)
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
};

/*
|--------------------------------------------------------------------------
| GET ALL JOBS
| GET /api/jobs
|--------------------------------------------------------------------------
*/

export const getJobs = async(req, res) => {
    try {
        const {
            search = "",
                location = "",
                jobType = "",
                experience = "",
                category = "",
                skills = "",
                minSalary = "",
                maxSalary = "",
                status = "Open",
                page = 1,
                limit = 12,
                sort = "latest",
        } = req.query;

        const currentPage = Math.max(Number(page) || 1, 1);
        const perPage = Math.min(
            Math.max(Number(limit) || 12, 1),
            50
        );

        const skip = (currentPage - 1) * perPage;

        const filter = {};

        /*
        |--------------------------------------------------------------------------
        | Status
        |--------------------------------------------------------------------------
        */

        if (status && status !== "all") {
            filter.status = status;
        }

        /*
        |--------------------------------------------------------------------------
        | Search
        |--------------------------------------------------------------------------
        */

        if (search.trim()) {
            const searchRegex = new RegExp(
                escapeRegex(search.trim()),
                "i"
            );

            filter.$or = [
                { title: searchRegex },
                { description: searchRegex },
                { companyName: searchRegex },
                { location: searchRegex },
                { category: searchRegex },
                { skills: searchRegex },
            ];
        }

        /*
        |--------------------------------------------------------------------------
        | Location
        |--------------------------------------------------------------------------
        */

        if (location.trim()) {
            filter.location = new RegExp(
                escapeRegex(location.trim()),
                "i"
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Job Type
        |--------------------------------------------------------------------------
        */

        if (jobType.trim()) {
            filter.jobType = jobType.trim();
        }

        /*
        |--------------------------------------------------------------------------
        | Experience
        |--------------------------------------------------------------------------
        */

        if (experience.trim()) {
            filter.experience = new RegExp(
                `^${escapeRegex(experience.trim())}$`,
                "i"
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Category
        |--------------------------------------------------------------------------
        */

        if (category.trim()) {
            filter.category = new RegExp(
                `^${escapeRegex(category.trim())}$`,
                "i"
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Skills
        |--------------------------------------------------------------------------
        */

        const requestedSkills = normalizeSkills(skills);

        if (requestedSkills.length > 0) {
            filter.skills = {
                $all: requestedSkills,
            };
        }

        /*
        |--------------------------------------------------------------------------
        | Salary
        |--------------------------------------------------------------------------
        */

        if (minSalary !== "") {
            const minimum = Number(minSalary);

            if (!Number.isNaN(minimum)) {
                filter.salaryMax = {
                    $gte: minimum,
                };
            }
        }

        if (maxSalary !== "") {
            const maximum = Number(maxSalary);

            if (!Number.isNaN(maximum)) {
                filter.salaryMin = {
                    $lte: maximum,
                };
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Sorting
        |--------------------------------------------------------------------------
        */

        let sortOption = {
            createdAt: -1,
        };

        if (sort === "oldest") {
            sortOption = {
                createdAt: 1,
            };
        }

        if (sort === "salary-high") {
            sortOption = {
                salaryMax: -1,
            };
        }

        if (sort === "salary-low") {
            sortOption = {
                salaryMin: 1,
            };
        }

        if (sort === "featured") {
            sortOption = {
                isFeatured: -1,
                createdAt: -1,
            };
        }

        /*
        |--------------------------------------------------------------------------
        | Query
        |--------------------------------------------------------------------------
        */

        const [jobs, totalJobs] = await Promise.all([
            Job.find(filter)
            .populate(
                "company",
                "name email logo companyLogo website location"
            )
            .sort(sortOption)
            .skip(skip)
            .limit(perPage)
            .lean(),

            Job.countDocuments(filter),
        ]);

        const totalPages = Math.ceil(
            totalJobs / perPage
        );

        return res.status(200).json({
            success: true,
            message: "Jobs fetched successfully.",
            jobs,
            pagination: {
                currentPage,
                totalPages,
                totalJobs,
                perPage,
                hasNextPage: currentPage < totalPages,
                hasPreviousPage: currentPage > 1,
            },
        });
    } catch (error) {
        console.error(
            "Get jobs error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to fetch jobs.",
            error: process.env.NODE_ENV === "development" ?
                error.message : undefined,
        });
    }
};

/*
|--------------------------------------------------------------------------
| GET SINGLE JOB
| GET /api/jobs/:id
|--------------------------------------------------------------------------
*/

export const getJobById = async(req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Job ID is required.",
            });
        }

        const job = await Job.findById(id)
            .populate(
                "company",
                "name email logo companyLogo website location description"
            )
            .lean();

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job fetched successfully.",
            job,
        });
    } catch (error) {
        console.error(
            "Get job by ID error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to fetch job.",
        });
    }
};

/*
|--------------------------------------------------------------------------
| GET FEATURED JOBS
| GET /api/jobs/featured
|--------------------------------------------------------------------------
*/

export const getFeaturedJobs = async(
    req,
    res
) => {
    try {
        const jobs = await Job.find({
                status: "Open",
                isFeatured: true,
            })
            .sort({
                createdAt: -1,
            })
            .limit(6)
            .populate(
                "company",
                "name logo companyLogo"
            )
            .lean();

        return res.status(200).json({
            success: true,
            jobs,
        });
    } catch (error) {
        console.error(
            "Featured jobs error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to fetch featured jobs.",
        });
    }
};

/*
|--------------------------------------------------------------------------
| GET JOB FILTER OPTIONS
| GET /api/jobs/meta/filters
|--------------------------------------------------------------------------
*/

export const getJobFilterOptions = async(
    req,
    res
) => {
    try {
        const [locations, categories, skills] =
        await Promise.all([
            Job.distinct("location", {
                status: "Open",
            }),

            Job.distinct("category", {
                status: "Open",
            }),

            Job.distinct("skills", {
                status: "Open",
            }),
        ]);

        return res.status(200).json({
            success: true,

            filters: {
                locations: locations
                    .filter(Boolean)
                    .sort(),

                categories: categories
                    .filter(Boolean)
                    .sort(),

                skills: skills
                    .filter(Boolean)
                    .sort(),
            },

            jobTypes: [
                "Full-Time",
                "Part-Time",
                "Internship",
                "Contract",
                "Freelance",
            ],

            experiences: [
                "Fresher",
                "0-1 Years",
                "1-3 Years",
                "3-5 Years",
                "5+ Years",
            ],
        });
    } catch (error) {
        console.error(
            "Job filter options error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to fetch filter options.",
        });
    }
};

