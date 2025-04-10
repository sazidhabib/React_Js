const Blog = require("../models/blog-model");

// ✅ Create Blog
const createBlog = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const { title, description, status } = req.body;
        const newBlog = await Blog.create({
            image: `/uploads/${req.file.filename}`,
            title,
            description,
            status
        });

        res.status(201).json({ message: "Blog Created", blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Get All Blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Update Blog
const updateBlog = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const updateData = { title, description, status };

        if (req.file) {
            updateData.image = req.file.path;
        }

        const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!blog) return res.status(404).json({ message: "Blog Not Found" });

        res.status(200).json({ message: "Blog Updated", blog });
    } catch (error) {
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
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { createBlog, getAllBlogs, updateBlog, deleteBlog };
