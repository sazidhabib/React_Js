const Blog = require("../models/blog-model");
const fs = require("fs");
const path = require("path");
const { Sequelize } = require('sequelize');
const sequelize = require('../db/database');
const { Op } = require("sequelize");


// ✅ Create Blog
const createBlog = async (req, res) => {
    try {
        const { title, description, status, publishDate } = req.body;
        const author = req.user.id;
        const _id = generateId();

        const blog = await Blog.create({
            _id,
            title,
            description,
            status: status || true,
            publishDate: publishDate || new Date(),
            author: author,
            UpdatedAt: new Date(), // Set UpdateAt on creation
            image: req.file ? req.file.url : null
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
            attributes: [
                '_id',
                'image',
                'title',
                'description',
                'status',
                'publishDate',
                'author',
                'createdAt',
                'updatedAt',
                // Add the new column
            ],
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
const updateBlog = async (req, res) => {
    try {
        const { title, description, status, publishDate } = req.body;
        const parsedStatus = status === "true" || status === true;

        const existingBlog = await Blog.findByPk(req.params.id);
        if (!existingBlog) {
            return res.status(404).json({ message: "Blog Not Found" });
        }

        // Check duplicate title (exclude current blog)
        if (title) {
            const duplicate = await Blog.findOne({
                where: {
                    [Op.and]: [
                        Sequelize.where(
                            Sequelize.literal('BINARY title'),
                            '=',
                            title
                        ),
                        { _id: { [Op.ne]: req.params.id } }
                    ]
                }
            });

            if (duplicate) {
                return res.status(400).json({ message: "A blog with this title already exists." });
            }
        }

        // Delete old image if new one is uploaded
        if (req.file && existingBlog.image) {
            const oldImagePath = path.join(__dirname, "..", "uploads", existingBlog.image);
            if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        }

        const updatedBlog = await existingBlog.update({
            title: title || existingBlog.title,
            description: description || existingBlog.description,
            status: parsedStatus !== undefined ? parsedStatus : existingBlog.status,
            image: req.file ? req.file.url : existingBlog.image,
            publishDate: publishDate || existingBlog.publishDate,
            UpdatedAt: new Date() // Update this field on every modification
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

// Helper function to generate _id (similar to MongoDB ObjectId)
function generateId() {
    const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
    const random = Math.random().toString(16).substring(2, 10);
    return timestamp + random.padStart(16, '0');
}

module.exports = { createBlog, getAllBlogs, updateBlog, deleteBlog };