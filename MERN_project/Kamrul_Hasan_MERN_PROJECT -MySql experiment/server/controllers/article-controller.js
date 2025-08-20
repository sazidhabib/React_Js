const Article = require("../models/article-model");
const fs = require("fs");
const path = require("path");

// ✅ Create Article
const createArticle = async (req, res) => {
    try {
        const { title, description, status, publishDate } = req.body;
        const parsedStatus = status === "true" || status === true;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and Description are required" });
        }

        // ❗ Check duplicate title
        const existing = await Article.findOne({ where: { title } });
        if (existing) {
            return res.status(409).json({ message: "An article with this title already exists." });
        }

        const imagePath = req.file ? req.file.filename : null;

        const newArticle = await Article.create({
            title,
            description,
            status: parsedStatus,
            author: req.user.id, // user ID from authMiddleware
            image: imagePath,
            publishDate: publishDate || new Date(),
        });

        res.status(201).json({ message: "Article Created", article: newArticle });
    } catch (error) {
        console.error("Create Article Error:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Get All Articles
const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({
            order: [["publishDate", "DESC"], ["createdAt", "DESC"]],
        });
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Update Article
const updateArticle = async (req, res) => {
    try {
        const { title, description, status, publishDate } = req.body;
        const parsedStatus = status === "true" || status === true;

        const existingArticle = await Article.findByPk(req.params.id);
        if (!existingArticle) {
            return res.status(404).json({ message: "Article Not Found" });
        }

        // ❗ Check duplicate title (exclude current)
        const duplicate = await Article.findOne({ where: { title, id: { [require("sequelize").Op.ne]: req.params.id } } });
        if (duplicate) {
            return res.status(409).json({ message: "Another article with this title already exists." });
        }

        // Delete old image if new one is uploaded
        if (req.file && existingArticle.image) {
            const oldImagePath = path.join(__dirname, "..", "uploads", existingArticle.image);
            if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        }

        const updatedArticle = await existingArticle.update({
            title,
            description,
            status: parsedStatus,
            image: req.file ? req.file.filename : existingArticle.image,
            publishDate,
        });

        res.status(200).json({ message: "Article Updated", article: updatedArticle });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Delete Article
const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ message: "Article Not Found" });

        if (article.image) {
            const imagePath = path.join(__dirname, "..", "uploads", article.image);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await article.destroy();
        res.status(200).json({ message: "Article Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { createArticle, getAllArticles, updateArticle, deleteArticle };
