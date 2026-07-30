import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
// ======================
// Register User
// ======================
export const registerUser = async(req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken =
            crypto.randomBytes(32).toString("hex");
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            verificationToken,
        });

        const verificationLink =
            `http://localhost:5000/api/auth/verify-email/${verificationToken}`;

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
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================
// Login User
// ======================
export const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
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
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================
// Get Profile
// ======================
export const getProfile = async(req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// Student Dashboard
export const studentDashboard = async(req, res) => {

    res.status(200).json({
        success: true,
        message: "Welcome Student Dashboard",
        user: req.user,
    });

};

// Company Dashboard
export const companyDashboard = async(req, res) => {

    res.status(200).json({
        success: true,
        message: "Welcome Company Dashboard",
        user: req.user,
    });

};

// Admin Dashboard
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
export const verifyEmail = async(req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            verificationToken: token,
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification token",
            });
        }

        user.isVerified = true;
        user.verificationToken = "";

        await user.save();

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};