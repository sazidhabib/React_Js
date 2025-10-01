// routes/tag-router.js
const express = require("express");
const router = express.Router();
const { upload, convertToWebp } = require("../middlewares/multer-config");
const {
    createTag,
    getAllTags,
    getTag,
    updateTag,
    deleteTag,
    bulkDeleteTags
} = require("../controllers/tag-controller");
const authMiddleware = require("../middlewares/auth-middleware");

// Configure multer for tags (optional - if you want separate config)
const tagUpload = upload.fields([
    { name: 'image', maxCount: 1 }
]);

// Public routes
router.get("/", getAllTags);
router.get("/:id", getTag);

// Protected routes (require authentication)
router.post("/", authMiddleware, tagUpload, convertToWebp, createTag);
router.patch("/:id", authMiddleware, tagUpload, convertToWebp, updateTag);
router.delete("/:id", authMiddleware, deleteTag);
router.post("/bulk-delete", authMiddleware, bulkDeleteTags);

module.exports = router;