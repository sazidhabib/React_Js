const express = require("express");
const router = express.Router();
const { upload, convertToWebp } = require("../middlewares/multer-config");
const { createArticle, getAllArticles, updateArticle, deleteArticle } = require("../controllers/article-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/", authMiddleware, upload.single("image"), convertToWebp, createArticle);
router.get("/", getAllArticles);
router.patch("/:id", authMiddleware, upload.single("image"), convertToWebp, updateArticle);
router.delete("/:id", authMiddleware, deleteArticle);

module.exports = router;
