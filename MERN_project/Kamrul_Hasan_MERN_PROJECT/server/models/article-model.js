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
    default: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String, // store the image filename or path
  },
  publishDate: {
    type: Date, // Store as ISO date for sorting
    required: false, // Optional, but you can make it required if you like
  },

}, { timestamps: true });


const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
