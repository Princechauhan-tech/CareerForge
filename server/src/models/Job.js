import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    // =====================================================
    // JOB BASIC INFORMATION
    // =====================================================

    title: {
        type: String,
        required: [true, "Job title is required."],
        trim: true,
        minlength: 2,
        maxlength: 150,
    },

    description: {
        type: String,
        required: [true, "Job description is required."],
        trim: true,
        minlength: 20,
    },

    // =====================================================
    // COMPANY
    // =====================================================

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: [true, "Company is required."],
        index: true,
    },

    /*
     * These two fields are kept for compatibility with
     * the existing public Jobs page.
     */

    companyName: {
        type: String,
        trim: true,
        default: "",
    },

    companyLogo: {
        type: String,
        trim: true,
        default: "",
    },

    // =====================================================
    // LOCATION
    // =====================================================

    location: {
        type: String,
        trim: true,
        default: "Remote",
        maxlength: 200,
    },

    // =====================================================
    // JOB TYPE
    // =====================================================

    jobType: {
        type: String,
        enum: [
            "Full-Time",
            "Part-Time",
            "Internship",
            "Contract",
            "Freelance",
        ],
        default: "Full-Time",
        index: true,
    },

    // =====================================================
    // EXPERIENCE
    // =====================================================

    experience: {
        type: String,
        trim: true,
        default: "Fresher",
        maxlength: 100,
    },

    // =====================================================
    // SALARY
    // =====================================================

    salaryMin: {
        type: Number,
        min: 0,
        default: 0,
    },

    salaryMax: {
        type: Number,
        min: 0,
        default: 0,
    },

    salaryCurrency: {
        type: String,
        trim: true,
        uppercase: true,
        default: "INR",
        maxlength: 10,
    },

    // =====================================================
    // SKILLS
    // =====================================================

    skills: {
        type: [String],
        default: [],
    },

    // =====================================================
    // CATEGORY
    // =====================================================

    category: {
        type: String,
        trim: true,
        default: "Other",
        maxlength: 100,
        index: true,
    },

    // =====================================================
    // DEADLINE
    // =====================================================

    deadline: {
        type: Date,
        default: null,
        index: true,
    },

    // =====================================================
    // JOB STATUS
    // =====================================================

    status: {
        type: String,
        enum: [
            "Open",
            "Closed",
            "Draft",
        ],
        default: "Open",
        index: true,
    },

    // =====================================================
    // FEATURED
    // =====================================================

    isFeatured: {
        type: Boolean,
        default: false,
        index: true,
    },

    // =====================================================
    // OPENINGS
    // =====================================================

    openings: {
        type: Number,
        min: 1,
        default: 1,
    },

    // =====================================================
    // APPLICATION COUNTER
    // =====================================================

    applicantsCount: {
        type: Number,
        min: 0,
        default: 0,
    },
}, {
    timestamps: true,
});

// =====================================================
// INDEXES
// =====================================================

jobSchema.index({
    title: "text",
    description: "text",
    companyName: "text",
    location: "text",
    category: "text",
    skills: "text",
});

jobSchema.index({
    company: 1,
    createdAt: -1,
});

jobSchema.index({
    company: 1,
    status: 1,
});

jobSchema.index({
    status: 1,
    createdAt: -1,
});

jobSchema.index({
    location: 1,
    jobType: 1,
});

// =====================================================
// VALIDATE SALARY
// =====================================================

jobSchema.pre("validate", function(next) {
    if (
        this.salaryMin > 0 &&
        this.salaryMax > 0 &&
        this.salaryMin > this.salaryMax
    ) {
        return next(
            new Error(
                "Minimum salary cannot be greater than maximum salary."
            )
        );
    }

    next();
});

// =====================================================
// NORMALIZE SKILLS
// =====================================================

jobSchema.pre("save", function(next) {
    if (Array.isArray(this.skills)) {
        this.skills = [
            ...new Set(
                this.skills
                .map((skill) =>
                    String(skill).trim()
                )
                .filter(Boolean)
            ),
        ];
    }

    if (this.title) {
        this.title = this.title.trim();
    }

    if (this.location) {
        this.location = this.location.trim();
    }

    next();
});

const Job = mongoose.model(
    "Job",
    jobSchema
);

export default Job;