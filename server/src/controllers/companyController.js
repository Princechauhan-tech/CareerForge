import mongoose from "mongoose";

import Company from "../models/Company.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

// ============================================================
// HELPERS
// ============================================================

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

const cleanString = (
    value,
    fallback = ""
) => {
    if (value === undefined || value === null) {
        return fallback;
    }

    return String(value).trim();
};

const normalizeCompanyPayload = (
    body = {}
) => {
    const payload = {};

    if (body.companyName !== undefined) {
        payload.companyName =
            cleanString(body.companyName);
    }

    if (body.email !== undefined) {
        payload.email =
            cleanString(body.email).toLowerCase();
    }

    if (body.website !== undefined) {
        payload.website =
            cleanString(body.website);
    }

    if (body.logo !== undefined) {
        payload.logo =
            cleanString(body.logo);
    }

    if (body.description !== undefined) {
        payload.description =
            cleanString(body.description);
    }

    if (body.industry !== undefined) {
        payload.industry =
            cleanString(body.industry);
    }

    if (body.companySize !== undefined) {
        payload.companySize =
            cleanString(body.companySize);
    }

    if (body.location !== undefined) {
        payload.location =
            cleanString(body.location);
    }

    if (body.foundedYear !== undefined) {
        const year = Number(
            body.foundedYear
        );

        payload.foundedYear =
            Number.isFinite(year) ?
            year :
            null;
    }

    if (body.linkedin !== undefined) {
        payload.linkedin =
            cleanString(body.linkedin);
    }

    if (body.twitter !== undefined) {
        payload.twitter =
            cleanString(body.twitter);
    }

    if (body.contactPhone !== undefined) {
        payload.contactPhone =
            cleanString(body.contactPhone);
    }

    if (body.contactPerson !== undefined) {
        payload.contactPerson =
            cleanString(body.contactPerson);
    }

    return payload;
};

// ============================================================
// GET MY COMPANY
// GET /api/company/profile
// ============================================================

export const getMyCompany = async(
    req,
    res
) => {
    try {
        const ownerId = getUserId(req);

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
            })
            .populate(
                "owner",
                "name fullName email profileImage"
            )
            .lean();

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company profile not found.",
                company: null,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Company profile fetched successfully.",
            company,
        });
    } catch (error) {
        console.error(
            "getMyCompany error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to fetch company profile.",
        });
    }
};

// ============================================================
// CREATE COMPANY
// POST /api/company/profile
// ============================================================

export const createCompany = async(
    req,
    res
) => {
    try {
        const ownerId = getUserId(req);

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

        const existingCompany =
            await Company.findOne({
                owner: ownerId,
            });

        if (existingCompany) {
            return res.status(409).json({
                success: false,
                message: "Company profile already exists.",
                company: existingCompany,
            });
        }

        const payload =
            normalizeCompanyPayload(
                req.body
            );

        if (!payload.companyName) {
            return res.status(400).json({
                success: false,
                message: "Company name is required.",
            });
        }

        if (!payload.email) {
            return res.status(400).json({
                success: false,
                message: "Company email is required.",
            });
        }

        const emailExists =
            await Company.findOne({
                email: payload.email,
            });

        if (emailExists) {
            return res.status(409).json({
                success: false,
                message: "A company with this email already exists.",
            });
        }

        const company =
            await Company.create({
                ...payload,
                owner: ownerId,
            });

        return res.status(201).json({
            success: true,
            message: "Company profile created successfully.",
            company,
        });
    } catch (error) {
        console.error(
            "createCompany error:",
            error
        );

        if (
            error ?.code === 11000
        ) {
            return res.status(409).json({
                success: false,
                message: "Company already exists.",
            });
        }

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
            message: "Unable to create company profile.",
        });
    }
};

// ============================================================
// UPDATE COMPANY
// PUT /api/company/profile
// ============================================================

export const updateCompany = async(
    req,
    res
) => {
    try {
        const ownerId = getUserId(req);

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

        const payload =
            normalizeCompanyPayload(
                req.body
            );

        if (
            Object.keys(payload).length ===
            0
        ) {
            return res.status(400).json({
                success: false,
                message: "No valid company data provided.",
            });
        }

        if (payload.email) {
            const emailOwner =
                await Company.findOne({
                    email: payload.email,
                    owner: {
                        $ne: ownerId,
                    },
                });

            if (emailOwner) {
                return res.status(409).json({
                    success: false,
                    message: "This company email is already in use.",
                });
            }
        }

        const company =
            await Company.findOneAndUpdate({
                owner: ownerId,
            }, {
                $set: payload,
            }, {
                new: true,
                runValidators: true,
            });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company profile not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Company profile updated successfully.",
            company,
        });
    } catch (error) {
        console.error(
            "updateCompany error:",
            error
        );

        if (
            error ?.code === 11000
        ) {
            return res.status(409).json({
                success: false,
                message: "Company email already exists.",
            });
        }

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
            message: "Unable to update company profile.",
        });
    }
};

// ============================================================
// DELETE COMPANY
// DELETE /api/company/profile
// ============================================================

export const deleteCompany = async(
    req,
    res
) => {
    try {
        const ownerId = getUserId(req);

        if (!ownerId) {
            return res.status(401).json({
                success: false,
                message: "Authenticated user not found.",
            });
        }

        const company =
            await Company.findOne({
                owner: ownerId,
            });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company profile not found.",
            });
        }

        const jobs =
            await Job.find({
                company: company._id,
            }).select("_id");

        const jobIds =
            jobs.map(
                (job) => job._id
            );

        if (jobIds.length > 0) {
            await Application.deleteMany({
                job: {
                    $in: jobIds,
                },
            });

            await Job.deleteMany({
                company: company._id,
            });
        }

        await Company.deleteOne({
            _id: company._id,
        });

        return res.status(200).json({
            success: true,
            message: "Company profile and associated jobs removed successfully.",
        });
    } catch (error) {
        console.error(
            "deleteCompany error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to delete company profile.",
        });
    }
};

