import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    website: {
        type: String,
        default: "",
    },

    logo: {
        type: String,
        default: "",
    },

    description: {
        type: String,
        default: "",
    },

    industry: {
        type: String,
        default: "",
    },

    companySize: {
        type: String,
        enum: [
            "1-10",
            "11-50",
            "51-200",
            "201-500",
            "500+",
        ],
        default: "1-10",
    },
    location: {
        type: String,
        default: "",
    },

    foundedYear: {
        type: Number,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});

const Company = mongoose.model("Company", companySchema);

export default Company;