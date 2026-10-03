import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    // =====================================================
    // STUDENT
    // =====================================================

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Student is required."],
        index: true,
    },

    // =====================================================
    // JOB
    // =====================================================

    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: [true, "Job is required."],
        index: true,
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

    // =====================================================
    // RESUME
    // =====================================================

    resume: {
        type: String,
        trim: true,
        default: "",
    },

    // =====================================================
    // COVER LETTER
    // =====================================================

    coverLetter: {
        type: String,
        trim: true,
        default: "",
        maxlength: 10000,
    },

    // =====================================================
    // APPLICATION STATUS
    // =====================================================

    status: {
        type: String,
        enum: [
            "Pending",
            "Shortlisted",
            "Rejected",
            "Accepted",
            "Withdrawn",
        ],
        default: "Pending",
        index: true,
    },

    // =====================================================
    // ATS SCORE
    // =====================================================

    atsScore: {
        type: Number,
        min: 0,
        max: 100,
        default: null,
    },

    // =====================================================
    // COMPANY NOTES
    // =====================================================

    recruiterNotes: {
        type: String,
        trim: true,
        default: "",
        maxlength: 5000,
    },

    // =====================================================
    // INTERVIEW
    // =====================================================

    interviewDate: {
        type: Date,
        default: null,
        index: true,
    },

    interviewType: {
        type: String,
        enum: [
            "Online",
            "Offline",
            "Phone",
            "Technical",
            "HR",
            "Other",
        ],
        default: "Online",
    },

    interviewLocation: {
        type: String,
        trim: true,
        default: "",
    },

    interviewLink: {
        type: String,
        trim: true,
        default: "",
    },

    interviewNotes: {
        type: String,
        trim: true,
        default: "",
    },

    // =====================================================
    // INTERVIEW STATUS
    // =====================================================

    interviewStatus: {
        type: String,
        enum: [
            "Not Scheduled",
            "Scheduled",
            "Completed",
            "Cancelled",
        ],
        default: "Not Scheduled",
    },

    // =====================================================
    // INTERVIEW RESULT
    // =====================================================

    interviewResult: {
        type: String,
        enum: [
            "Pending",
            "Passed",
            "Failed",
            "On Hold",
        ],
        default: "Pending",
    },
}, {
    timestamps: true,
});

// =====================================================
// PREVENT DUPLICATE APPLICATION
// =====================================================

applicationSchema.index({
    student: 1,
    job: 1,
}, {
    unique: true,
});

// =====================================================
// COMPANY APPLICANT QUERIES
// =====================================================

applicationSchema.index({
    company: 1,
    status: 1,
    createdAt: -1,
});

applicationSchema.index({
    company: 1,
    job: 1,
    createdAt: -1,
});

applicationSchema.index({
    company: 1,
    interviewDate: 1,
});

// =====================================================
// NORMALIZE DATA
// =====================================================

applicationSchema.pre("save", function(next) {
    if (this.resume) {
        this.resume = this.resume.trim();
    }

    if (this.coverLetter) {
        this.coverLetter =
            this.coverLetter.trim();
    }

    if (this.recruiterNotes) {
        this.recruiterNotes =
            this.recruiterNotes.trim();
    }

    next();
});

const Application = mongoose.model(
    "Application",
    applicationSchema
);

export default Application;