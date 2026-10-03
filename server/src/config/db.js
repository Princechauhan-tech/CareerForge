import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error("MONGODB_URI is missing from environment variables");
    }

    try {
        const conn = await mongoose.connect(mongoUri);

        console.log("MongoDB connected successfully");
        console.log(`Database host: ${conn.connection.host}`);

        return conn;
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
};

export default connectDB;
