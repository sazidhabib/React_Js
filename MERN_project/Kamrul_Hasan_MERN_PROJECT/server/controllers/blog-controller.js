const Blog = require("../models/blog-model");

// ✅ Create Blog
const createBlog = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const existingBlog = await Blog.findOne({ title: { $regex: new RegExp(`^${title}$`, 'i') } });
        if (existingBlog) {
            return res.status(400).json({ message: "A blog with this title already exists." });
        }

        const newBlog = new Blog({
            title,
            description,
            status,
            image: req.file?.filename || null,
        });

        await newBlog.save();
        res.status(201).json({ blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        const { id } = req.params;
        const { title, description, status } = req.body;

        // Check for duplicate title excluding the current blog
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
            },
            { new: true }
        );

        if (!updatedBlog) return res.status(404).json({ message: "Blog not found." });

        res.status(200).json({ blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
