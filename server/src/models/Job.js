import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Job title is required"],
        trim: true,
    },

    description: {
        type: String,
        required: [true, "Job description is required"],
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    location: {
        type: String,
        required: [true, "Location is required"],
        trim: true,
    },

    jobType: {
        type: String,
        enum: [
            "Full-Time",
            "Part-Time",
            "Internship",
            "Remote",
            "Contract",
        ],
        default: "Full-Time",
    },

    experienceLevel: {
        type: String,
        enum: [
            "Fresher",
            "Junior",
            "Mid-Level",
            "Senior",
        ],
        default: "Fresher",
    },

    salary: {
        type: Number,
        required: [true, "Salary is required"],
        min: 0,
    },
    skills: [{
        type: String,
        trim: true,
    }, ],

    vacancies: {
        type: Number,
        default: 1,
        min: 1,
    },

    applicationDeadline: {
        type: Date,
        required: [true, "Application deadline is required"],
    },

    status: {
        type: String,
        enum: ["Open", "Closed"],
        default: "Open",
    },
}, {
    timestamps: true,
});

const Job = mongoose.model("Job", jobSchema);

export default Job;