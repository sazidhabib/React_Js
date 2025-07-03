const express = require('express');
const {
    upsertSection,
    getSections,
    getSectionByType
} = require('../controllers/sectionController');
const { upload, convertToWebp } = require('../middlewares/multer-config');
const validate = require('../middlewares/validate-middleware');
const { z } = require('zod');
const authMiddleware = require('../middlewares/auth-middleware');

const router = express.Router();

// Zod schema for validation
const sectionSchema = z.object({
    type: z.enum(['about', 'jetukuboliniage', 'bookreading', 'music']),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required')
});

// Create/Update section
router.post(
    '/',
    upload.single('image'),
    convertToWebp,
    authMiddleware,
    validate(sectionSchema),
    upsertSection
);
//udate section
router.patch(
    '/:id',
    upload.single('image'),
    convertToWebp,
    authMiddleware,
    validate(sectionSchema),
    upsertSection
);

// Get all sections
router.get('/', getSections);

// Get specific section by type
router.get('/:type', getSectionByType);

module.exports = router;