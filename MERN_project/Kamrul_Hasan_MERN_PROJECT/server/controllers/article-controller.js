const Article = require("../models/article-model");

// ✅ Create Article
const createArticle = async (req, res, next) => {
    try {
        console.log("Request Body:", req.body);
        console.log("User:", req.user);

        const { title, description, status } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and Description are required" });
        }

        const newArticle = await Article.create({
            title,
            description,
            status,
            author: req.user._id, // Associate article with admin user
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
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Update Article
const updateArticle = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const article = await Article.findByIdAndUpdate(req.params.id, { title, description, status }, { new: true });

        if (!article) return res.status(404).json({ message: "Article Not Found" });

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

        res.status(200).json({ message: "Article Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { createArticle, getAllArticles, updateArticle, deleteArticle };
