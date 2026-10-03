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

// ============================================================
// GET COMPANY DASHBOARD
// GET /api/company/dashboard
// ============================================================

export const getCompanyDashboard =
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

            if (!isValidObjectId(ownerId)) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid authenticated user.",
                });
            }

            const company =
                await Company.findOne({
                    owner: ownerId,
                }).lean();

            if (!company) {
                return res.status(404).json({
                    success: false,
                    message: "Company profile not found.",
                    company: null,
                });
            }

            const companyId =
                company._id;

            const [
                totalJobs,
                openJobs,
                closedJobs,
                draftJobs,
                totalApplications,
                pendingApplications,
                shortlistedApplications,
                rejectedApplications,
                acceptedApplications,
                interviewApplications,
                recentJobs,
                recentApplications,
            ] = await Promise.all([
                Job.countDocuments({
                    company: companyId,
                }),

                Job.countDocuments({
                    company: companyId,
                    status: "Open",
                }),

                Job.countDocuments({
                    company: companyId,
                    status: "Closed",
                }),

                Job.countDocuments({
                    company: companyId,
                    status: "Draft",
                }),

                Application.countDocuments({
                    company: companyId,
                }),

                Application.countDocuments({
                    company: companyId,
                    status: "Pending",
                }),

                Application.countDocuments({
                    company: companyId,
                    status: "Shortlisted",
                }),

                Application.countDocuments({
                    company: companyId,
                    status: "Rejected",
                }),

                Application.countDocuments({
                    company: companyId,
                    status: "Accepted",
                }),

                Application.countDocuments({
                    company: companyId,
                    interviewStatus: "Scheduled",
                }),

                Job.find({
                    company: companyId,
                })
                .sort({
                    createdAt: -1,
                })
                .limit(5)
                .lean(),

                Application.find({
                    company: companyId,
                })
                .populate(
                    "student",
                    "name fullName email profileImage"
                )
                .populate(
                    "job",
                    "title location jobType"
                )
                .sort({
                    createdAt: -1,
                })
                .limit(8)
                .lean(),
            ]);

            return res.status(200).json({
                success: true,
                message: "Company dashboard fetched successfully.",

                company,

                stats: {
                    totalJobs,
                    openJobs,
                    closedJobs,
                    draftJobs,
                    totalApplications,
                    pendingApplications,
                    shortlistedApplications,
                    rejectedApplications,
                    acceptedApplications,
                    interviewApplications,
                },

                recentJobs,

                recentApplications,
            });
        } catch (error) {
            console.error(
                "getCompanyDashboard error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Unable to load company dashboard.",
            });
        }
    };

