const Blog = require("../models/blog-model");
const fs = require("fs");
const path = require("path");
const { Sequelize } = require('sequelize');
const sequelize = require('../db/database'); // Import the sequelize instance
const { Op } = require("sequelize");

// ✅ Create Blog
const createBlog = async (req, res) => {
    try {
        const { title, description, status, publishDate } = req.body;

        // Get the authenticated user's ID from authMiddleware
        const author = req.user.id; // This should come from your auth middleware

        const blog = await Blog.create({
            title,
            description,
            status: status || true,
            publishDate: publishDate || new Date(),
            author: author, // Use the authenticated user's ID
            image: req.file ? req.file.filename : null // Handle uploaded image
        });

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: blog
        });
    } catch (error) {
        console.error("Error creating blog:", error);

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: error.errors.map(e => e.message)
            });
        }

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                message: "Blog title already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// ✅ Get All Blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            order: [
                ['publishDate', 'DESC'],
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).json(blogs);
    } catch (error) {
        console.error("Error in getAllBlogs:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Update Blog
// ✅ Update Blog (Partial Update)
const updateBlog = async (req, res) => {
    try {
        const { title, description, status, publishDate } = req.body;
        const parsedStatus = status === "true" || status === true;

        // Extract fields from req.body only if they exist


        const existingBlog = await Blog.findByPk(req.params.id);
        if (!existingBlog) {
            return res.status(404).json({ message: "Blog Not Found" });
        }

        // ❗ Check duplicate title (exclude current) with collation-safe comparison
        const duplicate = await Blog.findOne({
            where: {
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.literal('BINARY title'),
                        '=',
                        title
                    ),
                    { id: { [Op.ne]: req.params.id } }
                ]
            }
        });

        if (duplicate) {
            return res.status(400).json({ message: "A blog with this title already exists." });
        }

        // Delete old image if new one is uploaded
        if (req.file && existingBlog.image) {
            const oldImagePath = path.join(__dirname, "..", "uploads", existingBlog.image);
            if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        }
        const updatedBlog = await existingBlog.update({
            title,
            description,
            status: parsedStatus,
            image: req.file ? req.file.filename : existingBlog.image,
            publishDate,
        });

        res.status(200).json({ message: "Blog Updated", blog: updatedBlog });

    } catch (error) {
        console.error("Error in updateBlog:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


// ✅ Delete Blog
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog Not Found" });

        if (blog.image) {
            const imagePath = path.join(__dirname, "..", "uploads", blog.image);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }
        await blog.destroy();
        res.status(200).json({ message: "Blog Deleted" });
    } catch (error) {
        console.error("Error in deleteBlog:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { createBlog, getAllBlogs, updateBlog, deleteBlog };
