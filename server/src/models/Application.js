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
        enum: ["Pending", "Accepted", "Rejected"],
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
}, {
    timestamps: true,
});

const Application = mongoose.model(
    "Application",
    applicationSchema
);

export default Application;