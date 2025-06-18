const mongoose = require('mongoose');

const sectionTypes = ['about', 'jetukuboliniage', 'bookreading', 'music'];

const SectionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: sectionTypes,
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

module.exports = mongoose.model('Section', SectionSchema);