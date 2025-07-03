const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true, // Prevent duplicate titles
        trim: true,
    },
    youtubeUrl: {
        type: String,
        required: true,
    },
    position: {
        type: Number,
        default: 9999, // fallback position
    },
}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema);
