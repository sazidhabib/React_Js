const express = require("express");
const router = express.Router();
const { createBlog, getAllBlogs, updateBlog, deleteBlog } = require("../controllers/blog-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const upload = require("../middlewares/multer-config");

// 🔹 Public Routes
router.get("/", getAllBlogs); // Get all blogs (visible on homepage)

// 🔹 Admin Routes (Require Authentication)
router.post("/", authMiddleware, upload.single("image"), createBlog);
router.put("/:id", authMiddleware, upload.single("image"), updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
