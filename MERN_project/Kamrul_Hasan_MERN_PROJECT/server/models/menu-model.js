const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    path: {
        trype: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Menu', menuSchema);
