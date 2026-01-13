const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Use memory storage for in-memory file processing
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
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

// Middleware to convert uploaded image to WebP - UPDATED FOR MULTIPLE FILES
const convertToWebp = async (req, res, next) => {
    try {
        // Handle single file uploads (for blog, article, section images)
        if (req.file) {
            const originalName = req.file.originalname.split('.')[0];
            const filename = `image-${Date.now()}.webp`;
            const outputPath = path.join("uploads", filename);

            // Ensure uploads directory exists
            if (!fs.existsSync("uploads")) {
                fs.mkdirSync("uploads", { recursive: true });
            }

            // Convert buffer to webp using sharp
            await sharp(req.file.buffer)
                .webp({ quality: 80 })
                .toFile(outputPath);

            // Attach file info for controller use
            req.file.filename = filename;
            req.file.path = outputPath;
        }

        // Handle multiple file uploads (for photos)
        else if (req.files && req.files.length > 0) {
            // Ensure uploads directory exists
            if (!fs.existsSync("uploads")) {
                fs.mkdirSync("uploads", { recursive: true });
            }

            for (const file of req.files) {
                const originalName = file.originalname.split('.')[0];
                const filename = `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.webp`;
                const outputPath = path.join("uploads", filename);

                // Convert buffer to webp using sharp
                await sharp(file.buffer)
                    .webp({ quality: 80 })
                    .toFile(outputPath);

                // Attach file info for controller use
                file.filename = filename;
                file.path = outputPath;
            }
        }

        next();
    } catch (err) {
        console.error("Image conversion failed:", err);
        next(err);
    }
};

module.exports = { upload, convertToWebp };