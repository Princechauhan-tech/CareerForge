import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
        select: false,
    },

    role: {
        type: String,
        enum: ["Student", "Company", "College", "Admin"],
        default: "Student",
    },

    profileImage: {
        type: String,
        default: "",
    },

    resume: {
        type: String,
        default: "",
    },

    // Student profile fields
    phone: {
        type: String,
        default: "",
        trim: true,
    },

    location: {
        type: String,
        default: "",
        trim: true,
    },

    headline: {
        type: String,
        default: "",
        trim: true,
    },

    bio: {
        type: String,
        default: "",
        trim: true,
    },

    skills: {
        type: [String],
        default: [],
    },

    education: {
        type: String,
        default: "",
        trim: true,
    },

    experience: {
        type: String,
        default: "",
        trim: true,
    },

    portfolio: {
        type: String,
        default: "",
        trim: true,
    },

    github: {
        type: String,
        default: "",
        trim: true,
    },

    linkedin: {
        type: String,
        default: "",
        trim: true,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    verificationToken: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;