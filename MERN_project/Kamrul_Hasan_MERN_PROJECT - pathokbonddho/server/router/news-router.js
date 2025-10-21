// routes/news-router.js
const express = require("express");
const router = express.Router();
const { upload, convertToWebp } = require("../middlewares/multer-config");
const {
    createNews,
    getAllNews,
    getNews,
    getNewsBySlug,
    updateNews,
    deleteNews,
    bulkDeleteNews
} = require("../controllers/news-controller");
const authMiddleware = require("../middlewares/auth-middleware");

// Configure multer for multiple files
const newsUpload = upload.fields([
    { name: 'leadImage', maxCount: 1 },
    { name: 'thumbImage', maxCount: 1 },
    { name: 'metaImage', maxCount: 1 }
]);

// Public routes
router.get("/", getAllNews);
router.get("/:id", getNews);
router.get("/slug/:slug", getNewsBySlug);

// Protected routes (require authentication)
router.post("/", authMiddleware, newsUpload, convertToWebp, createNews);
router.patch("/:id", authMiddleware, newsUpload, convertToWebp, updateNews);
router.delete("/:id", authMiddleware, deleteNews);
router.post("/bulk-delete", authMiddleware, bulkDeleteNews);

module.exports = router;