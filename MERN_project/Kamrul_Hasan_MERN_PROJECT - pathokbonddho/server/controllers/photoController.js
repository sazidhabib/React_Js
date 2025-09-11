const fs = require('fs');
const path = require('path');
const Photo = require('../models/photo');
const Album = require('../models/album');

exports.uploadMultiplePhotos = async (req, res, next) => {
    try {
        console.log('🔥 Request received - uploadMultiplePhotos');
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);

        const { albumId, caption } = req.body;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'At least one image is required.' });
        }

        // Check if album exists
        const album = await Album.findByPk(albumId);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }

        const createdPhotos = [];

        for (const file of files) {
            // Now file.path should be set by convertToWebp middleware
            if (!file || !file.path) {
                console.error('File or file.path is undefined after conversion:', file);
                continue;
            }

            const filePath = file.path.replace(/\\/g, '/');

            // Optional: Prevent duplicates per album
            const existing = await Photo.findOne({
                where: {
                    imageUrl: filePath,
                    albumId: albumId
                }
            });
            if (existing) continue;

            const photo = await Photo.create({
                imageUrl: filePath,
                albumId: albumId,
                caption: caption?.trim() || '',
            });

            createdPhotos.push(photo);
        }

        if (createdPhotos.length === 0) {
            return res.status(400).json({ message: 'No valid files were processed' });
        }

        res.status(201).json(createdPhotos);
    } catch (error) {
        console.error('❌ Error in uploadMultiplePhotos:', error);
        next(error);
    }
};

exports.getAllPhotos = async (req, res, next) => {
    try {
        const photos = await Photo.findAll({
            include: [{ model: Album }]
        });
        res.status(200).json(photos);
    } catch (error) {
        next(error);
    }
};

exports.getPhotosByAlbum = async (req, res, next) => {
    try {
        const { albumId } = req.params;
        const photos = await Photo.findAll({
            where: { albumId: albumId },
            include: [{ model: Album }]
        });
        res.status(200).json(photos);
    } catch (error) {
        next(error);
    }
};

exports.updatePhoto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const photo = await Photo.findByPk(id);

        if (!photo) return res.status(404).json({ message: 'Photo not found' });

        // If a new image is uploaded, delete old image
        if (req.file && req.file.path) {
            try {
                // Only delete if old image exists
                if (photo.imageUrl && fs.existsSync(path.join(__dirname, '..', photo.imageUrl))) {
                    fs.unlinkSync(path.join(__dirname, '..', photo.imageUrl));
                }
            } catch (err) {
                console.warn('Could not delete old image:', err.message);
            }
            photo.imageUrl = req.file.path.replace(/\\/g, '/');
        }

        // Update album if sent
        if (req.body.albumId) {
            photo.albumId = req.body.albumId;
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
        const photo = await Photo.findByPk(id);

        if (!photo) return res.status(404).json({ message: 'Photo not found' });

        // Delete image file
        try {
            fs.unlinkSync(path.join(__dirname, '..', photo.imageUrl));
        } catch (err) {
            console.warn('Could not delete image file:', err.message);
        }

        await Photo.destroy({
            where: { id: id }
        });

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};