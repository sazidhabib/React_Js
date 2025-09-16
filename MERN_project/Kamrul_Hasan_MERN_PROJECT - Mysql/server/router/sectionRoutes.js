const express = require("express");
const router = express.Router();
const { upload, convertToWebp } = require("../middlewares/multer-config");
const {
    upsertSection,
    updateSectionById,
    getSections,
    getSectionByType,
    deleteSection
} = require("../controllers/sectionController");
const authMiddleware = require("../middlewares/auth-middleware");
const validate = require('../middlewares/validate-middleware');
const { z } = require('zod');

// Zod schema for validation (same as before)
const sectionSchema = z.object({
    type: z.enum(['about', 'jetukuboliniage', 'bookreading', 'music']),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required')
});

// Create/Update section by type
router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    convertToWebp,
    validate(sectionSchema),
    upsertSection
);

// Update section by ID
router.patch(
    "/:id",
    authMiddleware,
    upload.single("image"),
    convertToWebp,
    validate(sectionSchema),
    updateSectionById
);

// Get all sections
router.get("/", getSections);

// Get specific section by type
router.get("/:type", getSectionByType);

// Delete section by ID
router.delete("/:id", authMiddleware, deleteSection);

module.exports = router;