const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true },
    caption: { type: String, default: '' }, // New optional caption field
    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Photo', photoSchema);