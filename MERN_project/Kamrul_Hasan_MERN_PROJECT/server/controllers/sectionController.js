const Section = require('../models/sections');

// Create or Update section
const upsertSection = async (req, res, next) => {
    try {
        const { type, title, description } = req.body;
        const imageUrl = req.file?.path || req.body?.imageUrl;

        // If updating by ID
        if (req.params.id) {
            const section = await Section.findById(req.params.id);
            if (!section) {
                return res.status(404).json({ error: 'Section not found' });
            }

            section.title = title;
            section.description = description;
            if (req.file) {
                section.imageUrl = imageUrl;
            }
            section.updatedAt = new Date();
            await section.save();
            return res.status(200).json(section);
        }

        // Find existing section of this type
        let section = await Section.findOne({ type });

        if (section) {
            // Update existing section
            section.title = title;
            section.description = description;
            if (req.file) { // Only update image if new file was uploaded
                section.imageUrl = imageUrl;
            }
            section.updatedAt = new Date();
        } else {
            // Create new section
            section = new Section({
                type,
                title,
                description,
                imageUrl
            });
        }

        await section.save();
        res.status(200).json(section);
    } catch (error) {
        next(error);
    }
};

// Get all sections
const getSections = async (req, res, next) => {
    try {
        const allSections = await Section.find();
        res.json(allSections);
    } catch (error) {
        next(error);
    }
};

// Get section by type
const getSectionByType = async (req, res, next) => {
    try {
        const section = await Section.findOne({ type: req.params.type });
        if (!section) {
            return res.status(404).json({ error: 'Section not found' });
        }
        res.json(section);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    upsertSection,
    getSections,
    getSectionByType
};