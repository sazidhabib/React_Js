const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true, // Default status to true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
    required: true,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
