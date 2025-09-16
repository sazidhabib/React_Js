const Section = require("../models/sections");
const fs = require("fs");
const path = require("path");

// ✅ Create or Update Section
const upsertSection = async (req, res) => {
    try {
        const { type, title, description } = req.body;
        const imageUrl = req.file ? req.file.filename : req.body?.imageUrl;

        if (!type || !title || !description) {
            return res.status(400).json({ message: "Type, Title and Description are required" });
        }

        // Check if section exists by type
        const existingSection = await Section.findOne({ where: { type } });

        if (existingSection) {
            // Update existing section
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

            return res.status(200).json({ message: "Section Updated", section: updatedSection });
        } else {
            // Create new section
            const newSection = await Section.create({
                type,
                title,
                description,
                imageUrl,
            });

            return res.status(201).json({ message: "Section Created", section: newSection });
        }
    } catch (error) {
        console.error("Upsert Section Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

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
        const section = await Section.findOne({ where: { type: req.params.type } });
        if (!section) {
            return res.status(404).json({ message: "Section Not Found" });
        }
        res.status(200).json(section);
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

module.exports = {
    upsertSection,
    updateSectionById,
    getSections,
    getSectionByType,
    deleteSection
};