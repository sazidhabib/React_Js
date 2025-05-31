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
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, publishDate } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ message: "Title is required." });
        }

        const existingBlog = await Blog.findOne({
            _id: { $ne: id },
            title: { $regex: new RegExp(`^${title}$`, 'i') }
        });
        if (existingBlog) {
            return res.status(400).json({ message: "A blog with this title already exists." });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            {
                title,
                description,
                status,
                ...(req.file && { image: req.file.filename }),
                publishDate: publishDate ? new Date(publishDate) : undefined,
            },
            { new: true }
        );

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
