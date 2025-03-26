const express = require("express");
const router = express.Router();
const Article = require("../models/article-model");
const authMiddleware = require("../middlewares/auth-middleware");

// 🔹 GET All Articles (Public)
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find({ status: true }); // Show only active articles
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🔹 GET All Articles (Admin Access - All Articles)
router.get("/admin", authMiddleware, async (req, res) => {
  try {
    const articles = await Article.find(); // Show all articles
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🔹 POST Create a New Article (Admin Only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required!" });
    }

    const newArticle = new Article({ title, description, status });
    await newArticle.save();

    res.status(201).json({ message: "Article Created", article: newArticle });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🔹 PUT Update an Article (Admin Only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res
      .status(200)
      .json({ message: "Article Updated", article: updatedArticle });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🔹 DELETE an Article (Admin Only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);

    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: "Article Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
