const Album = require('../models/album');

exports.createAlbum = async (req, res, next) => {
    try {
        const { name } = req.body;

        // Check for duplicate
        const existing = await Album.findOne({ name: name.trim() });
        if (existing) {
            return res.status(409).json({ message: 'Album name already exists' });
        }

        const album = await Album.create({ name: name.trim() });
        res.status(201).json(album);
    } catch (error) {
        next(error);
    }
};


exports.getAllAlbums = async (req, res, next) => {
    try {
        const albums = await Album.find();
        res.status(200).json(albums);
    } catch (error) {
        next(error);
    }
};

exports.updateAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await Album.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
};

exports.deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Album.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
