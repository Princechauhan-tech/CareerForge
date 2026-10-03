import mongoose from "mongoose";

import Company from "../models/Company.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

const getUserId = (req) => {
    return (
        req.user ?.id ||
        req.user ?._id ||
        req.user ?.userId
    );
};

const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

const normalizeSkills = (
    skills
) => {
    if (!skills) {
        return [];
    }

    if (Array.isArray(skills)) {
        return [
            ...new Set(
                skills
                .map((skill) =>
                    String(skill)
                    .trim()
                )
                .filter(Boolean)
            ),
        ];
    }

    return [
        ...new Set(
            String(skills)
            .split(",")
            .map((skill) =>
                skill.trim()
            )
            .filter(Boolean)
        ),
    ];
};

const getCompanyForOwner =
    async(ownerId) => {
        if (!ownerId) {
            return null;
        }

        return Company.findOne({
            owner: ownerId,
        });
    };

// ============================================================
// CREATE JOB
// POST /api/company/jobs
// ============================================================

export const createCompanyJob =
    async(req, res) => {
        try {
            const ownerId =
                getUserId(req);

            if (!ownerId) {
                return res.status(401).json({
                    success: false,
                    message: "Authenticated user not found.",
                });
            }

            const company =
                await getCompanyForOwner(
                    ownerId
                );

            if (!company) {
                return res.status(404).json({
                    success: false,
                    message: "Create your company profile before posting a job.",
                });
            }

            const {
                title,
                description,
                location,
                jobType,
                experience,
                salaryMin,
                salaryMax,
                salaryCurrency,
                skills,
                category,
                deadline,
                status,
                isFeatured,
                openings,
            } = req.body;

            if (!title ||
                !String(title).trim()
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Job title is required.",
                });
            }

            if (!description ||
                String(
                    description
                ).trim().length < 20
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Job description must contain at least 20 characters.",
                });
            }

            const min =
                salaryMin === "" ||
                salaryMin === undefined ?
                0 :
                Number(salaryMin);

            const max =
                salaryMax === "" ||
                salaryMax === undefined ?
                0 :
                Number(salaryMax);

            if (
                Number.isNaN(min) ||
                Number.isNaN(max)
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Salary must be a valid number.",
                });
            }

            if (min < 0 || max < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Salary cannot be negative.",
                });
            }

            if (
                min > 0 &&
                max > 0 &&
                min > max
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Minimum salary cannot be greater than maximum salary.",
                });
            }

            const job =
                await Job.create({
                    title: String(
                        title
                    ).trim(),

                    description: String(
                        description
                    ).trim(),

                    company: company._id,

                    companyName: company.companyName,

                    companyLogo: company.logo || "",

                    location: location ?
                        String(
                            location
                        ).trim() : "Remote",

                    jobType: jobType ||
                        "Full-Time",

                    experience: experience ||
                        "Fresher",

                    salaryMin: min,

                    salaryMax: max,

                    salaryCurrency: salaryCurrency ||
                        "INR",

                    skills: normalizeSkills(
                        skills
                    ),

                    category: category ||
                        "Other",

                    deadline: deadline ?
                        new Date(
                            deadline
                        ) : null,

                    status: status ||
                        "Open",

                    isFeatured: Boolean(
                        isFeatured
                    ),

                    openings: Number(
                            openings
                        ) > 0 ?
                        Number(
                            openings
                        ) : 1,
                });

            return res.status(201).json({
                success: true,
                message: "Job created successfully.",
                job,
            });
        } catch (error) {
            console.error(
                "createCompanyJob error:",
                error
            );

            if (
                error ?.name ===
                "ValidationError"
            ) {
                return res.status(400).json({
                    success: false,
                    message: Object.values(
                            error.errors
                        )
                        .map(
                            (item) =>
                            item.message
                        )
                        .join(", "),
                });
            }

            return res.status(500).json({
                success: false,
                message: "Unable to create job.",
            });
        }
    };

// ============================================================
// GET MY JOBS
// GET /api/company/jobs
// ============================================================

export const getCompanyJobs =
    async(req, res) => {
        try {
            const ownerId =
                getUserId(req);

            if (!ownerId) {
                return res.status(401).json({
                    success: false,
                    message: "Authenticated user not found.",
                });
            }

            const company =
                await getCompanyForOwner(
                    ownerId
                );

            if (!company) {
                return res.status(404).json({
                    success: false,
                    message: "Company profile not found.",
                });
            }

            const {
                search = "",
                    status = "all",
                    page = 1,
                    limit = 10,
            } = req.query;

            const currentPage =
                Math.max(
                    Number(page) || 1,
                    1
                );

            const perPage =
                Math.min(
                    Math.max(
                        Number(limit) ||
                        10,
                        1
                    ),
                    50
                );

            const skip =
                (currentPage - 1) *
                perPage;

            const filter = {
                company: company._id,
            };

            if (
                status &&
                status !== "all"
            ) {
                filter.status =
                    status;
            }

            if (
                search &&
                String(search).trim()
            ) {
                const escaped =
                    String(search)
                    .trim()
                    .replace(
                        /[.*+?^${}()|[\]\\]/g,
                        "\\$&"
                    );

                filter.$or = [{
                        title: {
                            $regex: escaped,
                            $options: "i",
                        },
                    },
                    {
                        description: {
                            $regex: escaped,
                            $options: "i",
                        },
                    },
                    {
                        location: {
                            $regex: escaped,
                            $options: "i",
                        },
                    },
                    {
                        category: {
                            $regex: escaped,
                            $options: "i",
                        },
                    },
                ];
            }

            const [
                jobs,
                totalJobs,
            ] = await Promise.all([
                Job.find(filter)
                .sort({
                    createdAt: -1,
                })
                .skip(skip)
                .limit(perPage)
                .lean(),

                Job.countDocuments(
                    filter
                ),
            ]);

            const totalPages =
                Math.ceil(
                    totalJobs /
                    perPage
                );

            return res.status(200).json({
                success: true,
                message: "Company jobs fetched successfully.",
                jobs,
                pagination: {
                    currentPage,
                    totalPages,
                    totalJobs,
                    perPage,
                    hasNextPage: currentPage <
                        totalPages,
                    hasPreviousPage: currentPage > 1,
                },
            });
        } catch (error) {
            console.error(
                "getCompanyJobs error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Unable to fetch company jobs.",
            });
        }
    };

// ============================================================
// GET SINGLE COMPANY JOB
// GET /api/company/jobs/:id
// ============================================================

export const getCompanyJobById =
    async(req, res) => {
        try {
            const ownerId =
                getUserId(req);

            const { id } =
            req.params;

            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid job ID.",
                });
            }

            const company =
                await getCompanyForOwner(
                    ownerId
                );

            if (!company) {
                return res.status(404).json({
                    success: false,
                    message: "Company profile not found.",
                });
            }

            const job =
                await Job.findOne({
                    _id: id,
                    company: company._id,
                }).lean();

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
                "getCompanyJobById error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Unable to fetch job.",
            });
        }
    };

// ============================================================
// UPDATE COMPANY JOB
// PUT /api/company/jobs/:id
// ============================================================

export const updateCompanyJob =
    async(req, res) => {
        try {
            const ownerId =
                getUserId(req);

            const { id } =
            req.params;

            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid job ID.",
                });
            }

            const company =
                await getCompanyForOwner(
                    ownerId
                );

            if (!company) {
                return res.status(404).json({
                    success: false,
                    message: "Company profile not found.",
                });
            }

            const job =
                await Job.findOne({
                    _id: id,
                    company: company._id,
                });

            if (!job) {
                return res.status(404).json({
                    success: false,
                    message: "Job not found.",
                });
            }

            const allowedFields = [
                "title",
                "description",
                "location",
                "jobType",
                "experience",
                "salaryMin",
                "salaryMax",
                "salaryCurrency",
                "category",
                "deadline",
                "status",
                "isFeatured",
                "openings",
            ];

            allowedFields.forEach(
                (field) => {
                    if (
                        req.body[
                            field
                        ] !== undefined
                    ) {
                        job[field] =
                            req.body[
                                field
                            ];
                    }
                }
            );

            if (
                req.body.skills !==
                undefined
            ) {
                job.skills =
                    normalizeSkills(
                        req.body.skills
                    );
            }

            if (
                job.salaryMin >
                job.salaryMax &&
                job.salaryMax > 0
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Minimum salary cannot be greater than maximum salary.",
                });
            }

            if (
                job.title
            ) {
                job.title =
                    String(
                        job.title
                    ).trim();
            }

            if (
                job.description
            ) {
                job.description =
                    String(
                        job.description
                    ).trim();
            }

            if (
                job.deadline &&
                Number.isNaN(
                    new Date(
                        job.deadline
                    ).getTime()
                )
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid deadline.",
                });
            }

            // Keep company snapshot in sync.
            job.companyName =
                company.companyName;

            job.companyLogo =
                company.logo || "";

            await job.save();

            return res.status(200).json({
                success: true,
                message: "Job updated successfully.",
                job,
            });
        } catch (error) {
            console.error(
                "updateCompanyJob error:",
                error
            );

            if (
                error ?.name ===
                "ValidationError"
            ) {
                return res.status(400).json({
                    success: false,
                    message: Object.values(
                            error.errors
                        )
                        .map(
                            (item) =>
                            item.message
                        )
                        .join(", "),
                });
            }

            return res.status(500).json({
                success: false,
                message: "Unable to update job.",
            });
        }
    };

// ============================================================
// CHANGE JOB STATUS
// PATCH /api/company/jobs/:id/status
// ============================================================

export const updateCompanyJobStatus =
    async(req, res) => {
        try {
            const ownerId =
                getUserId(req);

            const { id } =
            req.params;

            const {
                status,
            } = req.body;

            const validStatuses = [
                "Open",
                "Closed",
                "Draft",
            ];

            if (!validStatuses.includes(
                    status
                )) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid job status.",
                });
            }

            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid job ID.",
                });
            }

            const company =
                await getCompanyForOwner(
                    ownerId
                );

            if (!company) {
                return res.status(404).json({
                    success: false,
                    message: "Company profile not found.",
                });
            }

            const job =
                await Job.findOneAndUpdate({
                    _id: id,
                    company: company._id,
                }, {
                    $set: {
                        status,
                    },
                }, {
                    new: true,
                    runValidators: true,
                });

            if (!job) {
                return res.status(404).json({
                    success: false,
                    message: "Job not found.",
                });
            }

            return res.status(200).json({
                success: true,
                message: `Job marked as ${status}.`,
                job,
            });
        } catch (error) {
            console.error(
                "updateCompanyJobStatus error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Unable to update job status.",
            });
        }
    };

// ============================================================
// DELETE JOB
// DELETE /api/company/jobs/:id
// ============================================================

export const deleteCompanyJob =
    async(req, res) => {
        try {
            const ownerId =
                getUserId(req);

            const { id } =
            req.params;

            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid job ID.",
                });
            }

            const company =
                await getCompanyForOwner(
                    ownerId
                );

            if (!company) {
                return res.status(404).json({
                    success: false,
                    message: "Company profile not found.",
                });
            }

            const job =
                await Job.findOne({
                    _id: id,
                    company: company._id,
                });

            if (!job) {
                return res.status(404).json({
                    success: false,
                    message: "Job not found.",
                });
            }

            await Application.deleteMany({
                job: job._id,
            });

            await Job.deleteOne({
                _id: job._id,
            });

            return res.status(200).json({
                success: true,
                message: "Job and its applications deleted successfully.",
            });
        } catch (error) {
            console.error(
                "deleteCompanyJob error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Unable to delete job.",
            });
        }
    };
