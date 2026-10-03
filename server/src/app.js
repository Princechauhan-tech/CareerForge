import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import companyDashboardRoutes from "./routes/companyDashboardRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import studentProfileRoutes from "./routes/studentProfileRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import resumeViewerRoutes from "./routes/resumeViewerRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import filterRoutes from "./routes/filterRoutes.js";
import paginationRoutes from "./routes/paginationRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import ApiError from "./utils/ApiError.js";
import companyJobRoutes from "./routes/companyJobRoutes.js";
import companyApplicationRoutes from "./routes/companyApplicationRoutes.js";

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
            return callback(null, true);
        }

        return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
}));

app.use(express.json({ limit: "2mb" }));

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/company", companyDashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentProfileRoutes);
app.use("/api/student", resumeRoutes);
app.use("/api/student", resumeViewerRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/filter", filterRoutes);
app.use("/api/pagination", paginationRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/company/jobs", companyJobRoutes);
app.use("/api/company/applications", companyApplicationRoutes);

app.get("/", (req, res) => {
    res.send("CareerForge Backend Running...");
});

app.use((req, res, next) => {
    next(new ApiError(404, "Route Not Found"));
});

app.use(errorHandler);

export default app;
