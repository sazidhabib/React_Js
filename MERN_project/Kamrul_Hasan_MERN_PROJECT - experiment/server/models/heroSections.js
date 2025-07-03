const mongoose = require('mongoose');

const heroSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    lines: {
        type: [String],
        required: true
    },
    imageUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('heroSections', heroSectionSchema);