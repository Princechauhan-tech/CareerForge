import mongoose from "mongoose";

import Company from "../models/Company.js";
import Application from "../models/Application.js";
import Job from "../models/Job.js";

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
// GET COMPANY APPLICANTS
// GET /api/company/applications
// ============================================================

export const getCompanyApplications =
    async(req, res) => {
        try {
            const ownerId =
                getUserId(req);

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
                    jobId = "",
                    page = 1,
                    limit = 12,
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
                        12,
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
                jobId &&
                isValidObjectId(
                    jobId
                )
            ) {
                filter.job =
                    jobId;
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

                /*
                 * Student name/email search is
                 * done after population through
                 * aggregation-like fallback below.
                 *
                 * For scalable production search,
                 * a dedicated candidate search index
                 * can be added later.
                 */
            }

            let applications =
                await Application.find(
                    filter
                )
                .populate(
                    "student",
                    "name fullName email profileImage phone location skills bio resume"
                )
                .populate(
                    "job",
                    "title location jobType category"
                )
                .sort({
                    createdAt: -1,
                })
                .lean();

            if (
                search &&
                String(search).trim()
            ) {
                const query =
                    String(search)
                    .trim()
                    .toLowerCase();

                applications =
                    applications.filter(
                        (application) => {
                            const student =
                                application.student || {};

                            const job =
                                application.job || {};

                            const studentName =
                                student.name ||
                                student.fullName ||
                                "";

                            const studentEmail =
                                student.email ||
                                "";

                            const jobTitle =
                                job.title ||
                                "";

                            return [
                                    studentName,
                                    studentEmail,
                                    jobTitle,
                                ]
                                .join(" ")
                                .toLowerCase()
                                .includes(
                                    query
                                );
                        }
                    );
            }

            const totalApplications =
                applications.length;

            const paginatedApplications =
                applications.slice(
                    skip,
                    skip + perPage
                );

            const totalPages =
                Math.ceil(
                    totalApplications /
                    perPage
                );

            return res.status(200).json({
                success: true,
                message: "Company applications fetched successfully.",

                applications: paginatedApplications,

                pagination: {
                    currentPage,
                    totalPages,
                    totalApplications,
                    perPage,
                    hasNextPage: currentPage <
                        totalPages,
                    hasPreviousPage: currentPage > 1,
                },
            });
        } catch (error) {
            console.error(
                "getCompanyApplications error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Unable to fetch applicants.",
            });
        }
    };

// ============================================================
// GET APPLICATION BY ID
// GET /api/company/applications/:id
// ============================================================

export const getCompanyApplicationById =
    async(req, res) => {
        try {
            const ownerId =
                getUserId(req);

            const {
                id,
            } = req.params;

            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid application ID.",
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

            const application =
                await Application.findOne({
                    _id: id,
                    company: company._id,
                })
                .populate(
                    "student",
                    "-password"
                )
                .populate(
                    "job"
                )
                .populate(
                    "company"
                )
                .lean();

            if (!application) {
                return res.status(404).json({
                    success: false,
                    message: "Application not found.",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Application fetched successfully.",
                application,
            });
        } catch (error) {
            console.error(
                "getCompanyApplicationById error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Unable to fetch application.",
            });
        }
    };

// ============================================================
// UPDATE APPLICATION STATUS
// PATCH /api/company/applications/:id/status
// ============================================================

export const updateApplicationStatus =
    async(req, res) => {
        try {
            const ownerId =
                getUserId(req);

            const {
                id,
            } = req.params;

            const {
                status,
                recruiterNotes,
            } = req.body;

            const validStatuses = [
                "Pending",
                "Shortlisted",
                "Rejected",
                "Accepted",
            ];

            if (!validStatuses.includes(
                    status
                )) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid application status.",
                });
            }

            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid application ID.",
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

            const application =
                await Application.findOne({
                    _id: id,
                    company: company._id,
                });

            if (!application) {
                return res.status(404).json({
                    success: false,
                    message: "Application not found.",
                });
            }

            application.status =
                status;

            if (
                recruiterNotes !==
                undefined
            ) {
                application.recruiterNotes =
                    String(
                        recruiterNotes
                    ).trim();
            }

            await application.save();

            return res.status(200).json({
                success: true,
                message: `Application ${status.toLowerCase()} successfully.`,
                application,
            });
        } catch (error) {
            console.error(
                "updateApplicationStatus error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Unable to update application status.",
            });
        }
    };

// ============================================================
// SCHEDULE INTERVIEW
// POST /api/company/applications/:id/interview
// ============================================================

export const scheduleInterview =
    async(req, res) => {
        try {
            const ownerId =
                getUserId(req);

            const {
                id,
            } = req.params;

            const {
                interviewDate,
                interviewType =
                "Online",
                interviewLocation =
                "",
                interviewLink =
                "",
                interviewNotes =
                "",
            } = req.body;

            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid application ID.",
                });
            }

            if (!interviewDate) {
                return res.status(400).json({
                    success: false,
                    message: "Interview date is required.",
                });
            }

            const date =
                new Date(
                    interviewDate
                );

            if (
                Number.isNaN(
                    date.getTime()
                )
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid interview date.",
                });
            }

            if (
                date.getTime() <=
                Date.now()
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Interview must be scheduled in the future.",
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

            const application =
                await Application.findOne({
                    _id: id,
                    company: company._id,
                });

            if (!application) {
                return res.status(404).json({
                    success: false,
                    message: "Application not found.",
                });
            }

            application.interviewDate =
                date;

            application.interviewType =
                interviewType;

            application.interviewLocation =
                String(
                    interviewLocation
                ).trim();

            application.interviewLink =
                String(
                    interviewLink
                ).trim();

            application.interviewNotes =
                String(
                    interviewNotes
                ).trim();

            application.interviewStatus =
                "Scheduled";

            if (
                application.status ===
                "Pending"
            ) {
                application.status =
                    "Shortlisted";
            }

            await application.save();

            return res.status(200).json({
                success: true,
                message: "Interview scheduled successfully.",
                application,
            });
        } catch (error) {
            console.error(
                "scheduleInterview error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Unable to schedule interview.",
            });
        }
    };

// ============================================================
// UPDATE INTERVIEW
// PUT /api/company/applications/:id/interview
// ============================================================

export const updateInterview =
    async(req, res) => {
        try {
            const ownerId =
                getUserId(req);

            const {
                id,
            } = req.params;

            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid application ID.",
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

            const application =
                await Application.findOne({
                    _id: id,
                    company: company._id,
                });

            if (!application) {
                return res.status(404).json({
                    success: false,
                    message: "Application not found.",
                });
            }

            const allowedFields = [
                "interviewDate",
                "interviewType",
                "interviewLocation",
                "interviewLink",
                "interviewNotes",
                "interviewStatus",
                "interviewResult",
            ];

            allowedFields.forEach(
                (field) => {
                    if (
                        req.body[
                            field
                        ] !== undefined
                    ) {
                        application[
                                field
                            ] =
                            req.body[
                                field
                            ];
                    }
                }
            );

            if (
                application.interviewDate
            ) {
                const date =
                    new Date(
                        application.interviewDate
                    );

                if (
                    Number.isNaN(
                        date.getTime()
                    )
                ) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid interview date.",
                    });
                }

                application.interviewDate =
                    date;
            }

            await application.save();

            return res.status(200).json({
                success: true,
                message: "Interview updated successfully.",
                application,
            });
        } catch (error) {
            console.error(
                "updateInterview error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Unable to update interview.",
            });
        }
    };

// ============================================================
// CANCEL INTERVIEW
// DELETE /api/company/applications/:id/interview
// ============================================================

export const cancelInterview =
    async(req, res) => {
        try {
            const ownerId =
                getUserId(req);

            const {
                id,
            } = req.params;

            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid application ID.",
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

            const application =
                await Application.findOne({
                    _id: id,
                    company: company._id,
                });

            if (!application) {
                return res.status(404).json({
                    success: false,
                    message: "Application not found.",
                });
            }

            application.interviewDate =
                null;

            application.interviewLocation =
                "";

            application.interviewLink =
                "";

            application.interviewNotes =
                "";

            application.interviewStatus =
                "Cancelled";

            await application.save();

            return res.status(200).json({
                success: true,
                message: "Interview cancelled successfully.",
                application,
            });
        } catch (error) {
            console.error(
                "cancelInterview error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Unable to cancel interview.",
            });
        }
    };

