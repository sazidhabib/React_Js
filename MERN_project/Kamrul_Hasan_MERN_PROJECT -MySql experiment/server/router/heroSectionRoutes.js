const express = require('express');
const {
    createHeroSection,
    getHeroSection,
    updateHeroSection
} = require('../controllers/heroSectionController');
const { upload, convertToWebp } = require('../middlewares/multer-config.js');
const validate = require('../middlewares/validate-middleware');
const { z } = require('zod');
const authMiddleware = require('../middlewares/auth-middleware.js');

const router = express.Router();

// Zod schema for validation
const heroSectionSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    lines: z.array(z.string().min(1, 'Line cannot be empty')).length(3, 'Exactly 3 lines are required')
});

router.post(
    '/',
    upload.single('image'), authMiddleware,
    convertToWebp,
    validate(heroSectionSchema),
    createHeroSection
);

router.get('/', getHeroSection);

router.patch(
    '/:id', authMiddleware,
    upload.single('image'),
    convertToWebp,
    validate(heroSectionSchema),
    updateHeroSection
);

module.exports = router;