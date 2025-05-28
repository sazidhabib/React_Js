const Article = require("../models/article-model");

const fs = require("fs");
const path = require("path");

// ✅ Create Article
const createArticle = async (req, res, next) => {
    try {
        const { title, description, status, publishDate } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and Description are required" });
        }

        // ❗ Check for duplicate title
        const existing = await Article.findOne({ title });
        if (existing) {
            return res.status(409).json({ message: "An article with this title already exists." });
        }

        const imagePath = req.file ? req.file.filename : null;

        const newArticle = await Article.create({
            title,
            description,
            status,
            author: req.user._id,
            image: imagePath,
            publishDate: publishDate || Date.now(),
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
        const articles = await Article.find()
            .sort({ publishDate: -1, createdAt: -1 }); // Sort by publishDate in descending order;
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Update Article

const updateArticle = async (req, res) => {
    try {
        const { title, description, status, publishDate } = req.body;

        const existingArticle = await Article.findById(req.params.id);
        if (!existingArticle) {
            return res.status(404).json({ message: "Article Not Found" });
        }

        // ❗ Check if another article with the same title exists
        const duplicate = await Article.findOne({ title, _id: { $ne: req.params.id } });
        if (duplicate) {
            return res.status(409).json({ message: "Another article with this title already exists." });
        }

        // Delete old image if new one is uploaded
        if (req.file && existingArticle.image) {
            const oldImagePath = path.join(__dirname, "..", "uploads", existingArticle.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        const updatedFields = {
            title,
            description,
            status,
            image: req.file ? req.file.filename : existingArticle.image,
            publishDate,
        };

        const article = await Article.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

        res.status(200).json({ message: "Article Updated", article });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


// ✅ Delete Article
const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);

        if (!article) return res.status(404).json({ message: "Article Not Found" });

        // Delete image from disk
        if (article.image) {
            const imagePath = path.join(__dirname, "..", "uploads", article.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        res.status(200).json({ message: "Article Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


module.exports = { createArticle, getAllArticles, updateArticle, deleteArticle };
