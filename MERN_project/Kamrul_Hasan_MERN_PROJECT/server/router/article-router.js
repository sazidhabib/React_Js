const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer-config");
const {
    createArticle,
    getAllArticles,
    updateArticle,
    deleteArticle,
} = require("../controllers/article-controller");
const authMiddleware = require("../middlewares/auth-middleware");

// ✅ Create an Article (with image)
router.post("/", authMiddleware, upload.single("image"), createArticle);

// ✅ Get All Articles (Public)
router.get("/", getAllArticles);

// ✅ Update an Article (optional new image)
router.patch("/:id", authMiddleware, upload.single("image"), updateArticle);

// ✅ Delete an Article (delete image also)
router.delete("/:id", authMiddleware, deleteArticle);


module.exports = router;
