import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },

    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Interview Scheduled",
            "Accepted",
            "Rejected",
            "Selected",
        ],
        default: "Pending",
    },

    resume: {
        type: String,
        default: "",
    },

    coverLetter: {
        type: String,
        default: "",
    },

    // Interview Fields

    interviewDate: {
        type: Date,
    },

    interviewMode: {
        type: String,
        enum: ["Online", "Offline"],
    },

    interviewLink: {
        type: String,
        default: "",
    },

    interviewLocation: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
});

const Application = mongoose.model(
    "Application",
    applicationSchema
);

export default Application;