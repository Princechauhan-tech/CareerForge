import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import ApiError from "../utils/ApiError.js";

// ======================
// Register User
// ======================
export const registerUser = async(req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return next(new ApiError(400, "User already exists"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = crypto.randomBytes(32).toString("hex");

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            verificationToken,
        });

        const verificationLink = `http://localhost:5000/api/auth/verify-email/${verificationToken}`;

        console.log("Verification Link:", verificationLink);

        await sendEmail(
            email,
            "Verify Your Email",
            `Click here to verify your email:\n${verificationLink}`
        );

        console.log("Email sent successfully");

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

// ======================
// Login User
// ======================
export const loginUser = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ApiError(401, "Invalid email or password"));
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return next(new ApiError(401, "Invalid email or password"));
        }

        const token = jwt.sign({
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET, {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

// ======================
// Get Profile
// ======================
export const getProfile = async(req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return next(new ApiError(404, "User not found"));
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        next(error);
    }
};

// ======================
// Student Dashboard
// ======================
export const studentDashboard = async(req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Student Dashboard",
        user: req.user,
    });
};

// ======================
// Company Dashboard
// ======================
export const companyDashboard = async(req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Company Dashboard",
        user: req.user,
    });
};

// ======================
// Admin Dashboard
// ======================
export const adminDashboard = async(req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Admin Dashboard",
        user: req.user,
    });
};

// ======================
// Verify Email
// ======================
export const verifyEmail = async(req, res, next) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            verificationToken: token,
        });

        if (!user) {
            return next(
                new ApiError(400, "Invalid or expired verification token")
            );
        }

        user.isVerified = true;
        user.verificationToken = "";

        await user.save();

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });
    } catch (error) {
        next(error);
    }
};