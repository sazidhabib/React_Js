const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Make sure "uploads" folder exists
    },
    filename: function (req, file, cb) {
        cb(null, "image-" + Date.now() + path.extname(file.originalname));
    }
});

// File Filter (Only Images)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only .jpg, .jpeg, and .png formats allowed!"), false);
    }
};

// Upload Middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});

module.exports = upload;
