
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Use memory storage for in-memory file processing
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only .jpg, .jpeg, and .png formats allowed!"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, //2MB limit
});

// Middleware to convert uploaded image to WebP
const convertToWebp = async (req, res, next) => {
    if (!req.file) return next();

    try {
        const originalName = req.file.originalname.split('.')[0];
        const filename = `image-${Date.now()}.webp`;
        const outputPath = path.join("uploads", filename);

        // Convert buffer to webp using sharp
        await sharp(req.file.buffer)
            .webp({ quality: 80 })
            .toFile(outputPath);

        // Attach file info for controller use
        req.file.filename = filename;
        req.file.path = outputPath;

        next();
    } catch (err) {
        console.error("Image conversion failed:", err);
        next(err);
    }
};

module.exports = { upload, convertToWebp };
