const fs = require('fs');
const path = require('path');
const Photo = require('../models/photo');

exports.uploadMultiplePhotos = async (req, res, next) => {
    try {
        const { albumId, caption } = req.body; // Global caption (optional)
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'At least one image is required.' });
        }

        const createdPhotos = [];

        for (const file of files) {
            const filePath = file.path.replace(/\\/g, '/');

            // Optional: Prevent duplicates per album
            const existing = await Photo.findOne({ imageUrl: filePath, album: albumId });
            if (existing) continue;

            const photo = await Photo.create({
                imageUrl: filePath,
                album: albumId,
                caption: caption?.trim() || '', // Optional global caption
            });

            createdPhotos.push(photo);
        }

        res.status(201).json(createdPhotos);
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

        // Update caption if sent
        if (req.body.caption !== undefined) {
            photo.caption = req.body.caption === 'undefined' ? '' : req.body.caption.trim();
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