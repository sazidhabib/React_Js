const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    publishDate: {
        type: Date, // Store as ISO date for sorting
        required: false, // Optional, but you can make it required if you like
    },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
