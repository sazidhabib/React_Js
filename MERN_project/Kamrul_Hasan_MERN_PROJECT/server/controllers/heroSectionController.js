const heroSections = require('../models/heroSections');

// Create hero section
const createHeroSection = async (req, res, next) => {
    try {
        const { title, lines } = req.body;

        // Check if lines is an array with 3 items
        if (!Array.isArray(lines) || lines.length !== 3) {
            return res.status(400).json({ error: 'Exactly 3 lines of text are required' });
        }

        const heroSection = new heroSections({
            title,
            lines,
            imageUrl: req.file?.path || null
        });

        await heroSection.save();
        res.status(201).json(heroSection);
    } catch (error) {
        next(error);
    }
};

// Get hero section
const getHeroSection = async (req, res, next) => {
    try {
        const heroSection = await heroSections.findOne().sort({ createdAt: -1 });
        if (!heroSection) {
            return res.status(404).json({ error: 'Hero section not found' });
        }
        res.json(heroSection);
    } catch (error) {
        next(error);
    }
};

// Update hero section
const updateHeroSection = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, lines } = req.body;

        // Check if lines is an array with 3 items
        if (lines && (!Array.isArray(lines) || lines.length !== 3)) {
            return res.status(400).json({ error: 'Exactly 3 lines of text are required' });
        }

        const updateData = {
            title,
            lines,
            updatedAt: new Date()
        };

        if (req.file) {
            updateData.imageUrl = req.file.path;
        }

        const heroSection = await heroSections.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!heroSection) {
            return res.status(404).json({ error: 'Hero section not found' });
        }

        res.json(heroSection);
    } catch (error) {
        next(error);
    }
};

// Export as CommonJS
module.exports = {
    createHeroSection,
    getHeroSection,
    updateHeroSection
};