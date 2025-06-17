import mongoose from 'mongoose';

const sectionTypes = ['about', 'jetukuboliniage', 'bookreading', 'music'];

const sectionSchema = new mongoose.Schema({
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


const sections = mongoose.model("sections", sectionSchema);
module.exports = sections;