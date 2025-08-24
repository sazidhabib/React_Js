
const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Menu name is required'],
        trim: true,
        unique: true
    },
    path: {
        type: String,
        required: [true, 'Menu path is required'],
        trim: true,
        unique: true
    },
    order: {
        type: Number,
        required: [true, 'Order is required'],
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Menu', menuSchema);