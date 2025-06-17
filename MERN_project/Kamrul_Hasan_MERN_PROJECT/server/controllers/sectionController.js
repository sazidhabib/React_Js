import sections from '../models/sections.js';

// Create or Update section
export const upsertSection = async (req, res, next) => {
    try {
        const { type, title, description } = req.body;
        const imageUrl = req.file?.path || null;

        // Find existing section of this type
        let section = await sections.findOne({ type });

        if (section) {
            // Update existing section
            section.title = title;
            section.description = description;
            if (imageUrl) section.imageUrl = imageUrl;
            section.updatedAt = new Date();
        } else {
            // Create new section
            section = new sections({
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
export const getSections = async (req, res, next) => {
    try {
        const sections = await sections.find();
        res.json(sections);
    } catch (error) {
        next(error);
    }
};

// Get section by type
export const getSectionByType = async (req, res, next) => {
    try {
        const section = await sections.findOne({ type: req.params.type });
        if (!section) {
            return res.status(404).json({ error: 'Section not found' });
        }
        res.json(section);
    } catch (error) {
        next(error);
    }
};