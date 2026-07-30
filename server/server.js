import dotenv from "dotenv";
dotenv.config();
console.log("SERVER CLOUD:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("SERVER KEY:", process.env.CLOUDINARY_API_KEY);
console.log("SERVER SECRET:", process.env.CLOUDINARY_API_SECRET);
console.log("EMAIL:", process.env.EMAIL_USER);
console.log("Current Dir:", process.cwd());
console.log("All ENV Keys:");
console.log(
    "All ENV Keys:",
    Object.keys(process.env).filter(
        key =>
        key.includes("CLOUD") ||
        key.includes("EMAIL") ||
        key.includes("JWT") ||
        key.includes("GROQ")
    )
);

console.log("GROQ:", process.env.GROQ_API_KEY);

import "./src/config/cloudinary.js";

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});