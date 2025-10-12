// routes/ad-router.js
const express = require("express");
const router = express.Router();
const { upload, convertToWebp } = require("../middlewares/multer-config");
const {
    createAd,
    getAllAds,
    getAd,
    getAdsByPosition,
    updateAd,
    deleteAd,
    bulkDeleteAds,
    recordImpression,
    recordClick
} = require("../controllers/ad-controller");
const authMiddleware = require("../middlewares/auth-middleware");

// Public routes
router.get("/", getAllAds);
router.get("/position", getAdsByPosition); // Get ads by position
router.get("/:id", getAd);

// Tracking routes (public)
router.post("/:id/impression", recordImpression);
router.post("/:id/click", recordClick);

// Protected routes (require authentication)
router.post("/", authMiddleware, upload.single("image"), convertToWebp, createAd);
router.patch("/:id", authMiddleware, upload.single("image"), convertToWebp, updateAd);
router.delete("/:id", authMiddleware, deleteAd);
router.post("/bulk-delete", authMiddleware, bulkDeleteAds);

module.exports = router;