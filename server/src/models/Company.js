import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    // =====================================================
    // BASIC COMPANY INFORMATION
    // =====================================================

    companyName: {
        type: String,
        required: [true, "Company name is required."],
        trim: true,
        minlength: 2,
        maxlength: 150,
    },

    email: {
        type: String,
        required: [true, "Company email is required."],
        unique: true,
        lowercase: true,
        trim: true,
        maxlength: 150,
    },

    website: {
        type: String,
        trim: true,
        default: "",
        maxlength: 300,
    },

    logo: {
        type: String,
        trim: true,
        default: "",
    },

    description: {
        type: String,
        trim: true,
        default: "",
        maxlength: 5000,
    },

    // =====================================================
    // COMPANY DETAILS
    // =====================================================

    industry: {
        type: String,
        trim: true,
        default: "",
        maxlength: 120,
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
        trim: true,
        default: "",
        maxlength: 200,
    },

    foundedYear: {
        type: Number,
        min: 1800,
        max: new Date().getFullYear(),
        default: null,
    },

    // =====================================================
    // OWNER
    // =====================================================

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Company owner is required."],
        unique: true,
        index: true,
    },

    // =====================================================
    // COMPANY STATUS
    // =====================================================

    status: {
        type: String,
        enum: [
            "Active",
            "Pending",
            "Suspended",
        ],
        default: "Active",
        index: true,
    },

    isVerified: {
        type: Boolean,
        default: false,
        index: true,
    },

    // =====================================================
    // SOCIAL / PROFESSIONAL LINKS
    // =====================================================

    linkedin: {
        type: String,
        trim: true,
        default: "",
    },

    twitter: {
        type: String,
        trim: true,
        default: "",
    },

    // =====================================================
    // CONTACT
    // =====================================================

    contactPhone: {
        type: String,
        trim: true,
        default: "",
    },

    contactPerson: {
        type: String,
        trim: true,
        default: "",
        maxlength: 120,
    },
}, {
    timestamps: true,
});

// =====================================================
// INDEXES
// =====================================================

companySchema.index({
    companyName: "text",
    industry: "text",
    location: "text",
    description: "text",
});

companySchema.index({
    owner: 1,
    createdAt: -1,
});

companySchema.index({
    status: 1,
    isVerified: 1,
});

// =====================================================
// NORMALIZE EMAIL
// =====================================================

companySchema.pre("save", function(next) {
    if (this.email) {
        this.email = this.email.trim().toLowerCase();
    }

    next();
});

const Company = mongoose.model(
    "Company",
    companySchema
);

export default Company;