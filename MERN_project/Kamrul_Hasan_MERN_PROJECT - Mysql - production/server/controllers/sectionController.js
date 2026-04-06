const Section = require("../models/sections");
const fs = require("fs");
const path = require("path");

// ✅ Update Section by ID
const updateSectionById = async (req, res) => {
    try {
        const { title, description } = req.body;
        const imageUrl = req.file ? req.file.filename : req.body?.imageUrl;

        const existingSection = await Section.findByPk(req.params.id);
        if (!existingSection) {
            return res.status(404).json({ message: "Section Not Found" });
        }

        // Delete old image if new one is uploaded
        if (req.file && existingSection.imageUrl) {
            const oldImagePath = path.join(__dirname, "..", "uploads", existingSection.imageUrl);
            if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        }

        const updatedSection = await existingSection.update({
            title,
            description,
            imageUrl: req.file ? imageUrl : existingSection.imageUrl,
        });

        res.status(200).json({ message: "Section Updated", section: updatedSection });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Get All Sections
const getSections = async (req, res) => {
    try {
        const sections = await Section.findAll({
            order: [["updatedAt", "DESC"]],
        });
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Get Section by Type
const getSectionByType = async (req, res) => {
    try {
        const sections = await Section.findAll({
            where: {
                type: req.params.type,
                isVisible: true
            },
            order: [["createdAt", "ASC"]]
        });
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Delete Section
const deleteSection = async (req, res) => {
    try {
        const section = await Section.findByPk(req.params.id);
        if (!section) return res.status(404).json({ message: "Section Not Found" });

        if (section.imageUrl) {
            const imagePath = path.join(__dirname, "..", "uploads", section.imageUrl);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await section.destroy();
        res.status(200).json({ message: "Section Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Toggle Visibility
const toggleVisibility = async (req, res) => {
    try {
        const section = await Section.findByPk(req.params.id);
        if (!section) return res.status(404).json({ message: "Section Not Found" });

        const newVisibility = !section.isVisible;
        await section.update({ isVisible: newVisibility });

        res.status(200).json({ message: "Visibility toggled", section });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Create or Update Section
const upsertSection = async (req, res) => {
    try {
        const { type, title, description } = req.body;
        const imageUrl = req.file ? req.file.filename : req.body?.imageUrl;

        if (!type || !title || !description) {
            return res.status(400).json({ message: "Type, Title and Description are required" });
        }

        // Create new section (Multiples allowed)
        const newSection = await Section.create({
            _id: generateId(),
            type,
            title,
            description,
            imageUrl,
            isVisible: true,
        });

        return res.status(201).json({ message: "Section Created", section: newSection });
    } catch (error) {
        console.error("Upsert Section Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Helper function to generate _id (similar to MongoDB ObjectId)
function generateId() {
    const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
    const random = Math.random().toString(16).substring(2, 10);
    return timestamp + random.padStart(16, '0');
}

module.exports = {
    upsertSection,
    updateSectionById,
    getSections,
    getSectionByType,
    deleteSection,
    toggleVisibility
};