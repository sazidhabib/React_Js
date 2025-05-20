const fs = require('fs');
const path = require('path');
const Photo = require('../models/photo');

exports.uploadPhoto = async (req, res, next) => {
    try {
        const { albumId } = req.body;
        const filePath = req.file?.path;

        if (!filePath) {
            return res.status(400).json({ message: 'Image is required.' });
        }

        const existing = await Photo.findOne({
            imageUrl: filePath.replace(/\\/g, '/'),
            album: albumId
        });

        if (existing) {
            return res.status(409).json({ message: 'Duplicate photo in this album' });
        }

        const photo = await Photo.create({
            imageUrl: filePath.replace(/\\/g, '/'),
            album: albumId,
        });

        res.status(201).json(photo);
    } catch (error) {
        next(error);
    }
};

exports.getAllPhotos = async (req, res, next) => {
    try {
        const photos = await Photo.find().populate('album');
        res.status(200).json(photos);
    } catch (error) {
        next(error);
    }
};

exports.getPhotosByAlbum = async (req, res, next) => {
    try {
        const { albumId } = req.params;
        const photos = await Photo.find({ album: albumId }).populate('album');
        res.status(200).json(photos);
    } catch (error) {
        next(error);
    }
};

exports.updatePhoto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const photo = await Photo.findById(id);
        if (!photo) return res.status(404).json({ message: 'Photo not found' });

        // If a new image is uploaded, delete old image
        if (req.file) {
            fs.unlinkSync(path.join(__dirname, '..', photo.imageUrl));
            photo.imageUrl = req.file.path.replace(/\\/g, '/');
        }

        // Update album if sent
        if (req.body.albumId) {
            photo.album = req.body.albumId;
        }

        await photo.save();
        res.status(200).json(photo);
    } catch (error) {
        next(error);
    }
};

exports.deletePhoto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const photo = await Photo.findByIdAndDelete(id);
        if (!photo) return res.status(404).json({ message: 'Photo not found' });

        // Delete image file
        fs.unlinkSync(path.join(__dirname, '..', photo.imageUrl));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
