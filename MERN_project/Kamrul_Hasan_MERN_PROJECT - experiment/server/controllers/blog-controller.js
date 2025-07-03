const Blog = require("../models/blog-model");

// ✅ Create Blog
const createBlog = async (req, res) => {
    try {
        const { title, description, status, publishDate } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ message: "Title is required." });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Image is required." });
        }

        const existingBlog = await Blog.findOne({ title: { $regex: new RegExp(`^${title}$`, 'i') } });
        if (existingBlog) {
            return res.status(400).json({ message: "A blog with this title already exists." });
        }

        const newBlog = new Blog({
            title,
            description,
            status,
            image: req.file.filename,
            publishDate: publishDate ? new Date(publishDate) : new Date(),
        });

        await newBlog.save();
        res.status(201).json({ blog: newBlog });
    } catch (error) {
        console.error("Error in createBlog:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Get All Blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .sort({ publishDate: -1, createdAt: -1 });
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
        const { id } = req.params;
        const updateFields = {};

        // Extract fields from req.body only if they exist
        if (req.body.title) {
            if (!req.body.title.trim()) {
                return res.status(400).json({ message: "Title cannot be empty." });
            }

            const existingBlog = await Blog.findOne({
                _id: { $ne: id },
                title: { $regex: new RegExp(`^${req.body.title}$`, 'i') }
            });

            if (existingBlog) {
                return res.status(400).json({ message: "A blog with this title already exists." });
            }

            updateFields.title = req.body.title;
        }

        if (typeof req.body.title !== "undefined") updateFields.title = req.body.title;
        if (typeof req.body.description !== "undefined") updateFields.description = req.body.description;
        if (typeof req.body.publishDate !== "undefined") updateFields.publishDate = req.body.publishDate;
        if (typeof req.body.status !== "undefined") updateFields.status = req.body.status;

        // If no fields are provided, return an error
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No fields provided for update." });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedBlog) return res.status(404).json({ message: "Blog not found." });

        res.status(200).json({ blog: updatedBlog });
    } catch (error) {
        console.error("Error in updateBlog:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


// ✅ Delete Blog
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog Not Found" });
        res.status(200).json({ message: "Blog Deleted" });
    } catch (error) {
        console.error("Error in deleteBlog:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { createBlog, getAllBlogs, updateBlog, deleteBlog };
