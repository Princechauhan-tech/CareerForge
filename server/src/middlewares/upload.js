import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

console.log("UPLOAD CLOUD:", process.env.CLOUDINARY_CLOUD_NAME);

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async(req, file) => ({
        folder: "careerforge",
        resource_type: "image",
        format: file.mimetype.split("/")[1],
        public_id: Date.now() + "-" + file.originalname,
    }),
});

const upload = multer({ storage });

export default upload;