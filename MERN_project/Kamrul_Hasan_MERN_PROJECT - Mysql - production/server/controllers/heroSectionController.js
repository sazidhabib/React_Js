const HeroSection = require('../models/heroSections');

// Create hero section
const createHeroSection = async (req, res, next) => {
    try {
        const { title, lines } = req.body;

        // Check if lines is an array with 3 items
        if (!Array.isArray(lines) || lines.length !== 3) {
            return res.status(400).json({ error: 'Exactly 3 lines of text are required' });
        }

        // Check if each line is not empty
        lines.forEach((line, index) => {
            if (typeof line !== 'string' || line.trim() === '') {
                return res.status(400).json({ error: `Line ${index + 1} cannot be empty` });
            }
        });

        const heroSection = await HeroSection.create({
            title,
            lines: lines, // Will be converted to JSON string by hook
            imageUrl: req.file?.url || null
        });

        res.status(201).json(heroSection);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: error.errors[0].message });
        }
        next(error);
    }
};

// Get hero section
const getHeroSection = async (req, res, next) => {
    try {
        const heroSection = await HeroSection.findOne({
            order: [['createdAt', 'DESC']]
        });

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

        // Check if lines is provided and is an array with 3 items
        if (lines && (!Array.isArray(lines) || lines.length !== 3)) {
            return res.status(400).json({ error: 'Exactly 3 lines of text are required' });
        }

        // Check if each line is not empty
        if (lines) {
            lines.forEach((line, index) => {
                if (typeof line !== 'string' || line.trim() === '') {
                    return res.status(400).json({ error: `Line ${index + 1} cannot be empty` });
                }
            });
        }

        const heroSection = await HeroSection.findByPk(id);

        if (!heroSection) {
            return res.status(404).json({ error: 'Hero section not found' });
        }

        const updateData = {
            title: title || heroSection.title,
            lines: lines ? lines : heroSection.lines,
            updatedAt: new Date()
        };

        if (req.file) {
            updateData.imageUrl = req.file.url;
        }

        await heroSection.update(updateData);

        res.json(heroSection);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: error.errors[0].message });
        }
        next(error);
    }
};

module.exports = {
    createHeroSection,
    getHeroSection,
    updateHeroSection
};