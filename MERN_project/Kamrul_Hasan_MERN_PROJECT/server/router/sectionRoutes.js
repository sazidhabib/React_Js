import express from 'express';
import {
    upsertSection,
    getSections,
    getSectionByType
} from '../controllers/sectionController.js';
import { upload, convertToWebp } from '../middleware/multer-config.js';
import validate from '../middleware/validate-middleware.js';
import { z } from 'zod';

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
    validate(sectionSchema),
    upsertSection
);

// Get all sections
router.get('/', getSections);

// Get specific section by type
router.get('/:type', getSectionByType);

export default router;