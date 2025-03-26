const express = require("express");
const router = express.Router();
const { createArticle, getAllArticles, updateArticle, deleteArticle } = require("../controllers/article-controller");
const authMiddleware = require("../middlewares/auth-middleware");

// ✅ Create an Article (Only Admins)
router.post("/", authMiddleware, createArticle);

// ✅ Get All Articles (Public)
router.get("/", getAllArticles);

// ✅ Update an Article (Only Admins)
router.put("/:id", authMiddleware, updateArticle);

// ✅ Delete an Article (Only Admins)
router.delete("/:id", authMiddleware, deleteArticle);

module.exports = router;
