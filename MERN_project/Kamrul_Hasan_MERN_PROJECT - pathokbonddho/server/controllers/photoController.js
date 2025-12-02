const fs = require('fs');
const path = require('path');
const Photo = require('../models/photo');
const Album = require('../models/album');
const ImageRegistry = require('../models/imageRegistry'); // Add this
const ImageService = require('../services/imageService'); // Add this
const Article = require('../models/article-model'); // Add this
const Blog = require('../models/blog-model'); // Add this

// NEW: Get all images from all sources
exports.getAllImages = async (req, res, next) => {
    try {
        const { page = 1, limit = 50, sourceType } = req.query;

        console.log('📸 Fetching all images - Page:', page, 'Limit:', limit, 'Source:', sourceType);

        const result = await ImageService.getAllImages(
            parseInt(page),
            parseInt(limit),
            sourceType
        );

        // Transform data for frontend
        const transformedImages = result.images.map(img => ({
            id: img.id,
            filename: img.filename,
            imageUrl: img.filePath,
            source: img.sourceType,
            caption: img.photo?.caption || '',
            albumId: img.photo?.albumId || null,
            albumName: img.photo?.Album?.name || null,
            isManaged: img.sourceType === 'photo',
            relatedEntity: {
                article: img.article ? { id: img.article.id, title: img.article.title } : null,
                blog: img.blog ? { id: img.blog.id, title: img.blog.title } : null,
                photo: img.photo ? { id: img.photo.id, caption: img.photo.caption } : null
            },
            createdAt: img.createdAt,
            updatedAt: img.updatedAt
        }));

        res.status(200).json({
            success: true,
            images: transformedImages,
            pagination: {
                currentPage: result.currentPage,
                totalPages: result.totalPages,
                totalCount: result.totalCount
            }
        });
    } catch (error) {
        console.error('❌ Error in getAllImages:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch images'
        });
    }
};

// NEW: Add existing image to photo gallery
exports.addToGallery = async (req, res, next) => {
    try {
        const { filename, caption = '', albumId = null } = req.body;

        console.log('🎨 Adding image to gallery:', { filename, caption, albumId });

        // Find the image in registry
        const imageRecord = await ImageRegistry.findOne({ where: { filename } });

        if (!imageRecord) {
            return res.status(404).json({
                success: false,
                message: 'Image not found in registry'
            });
        }

        // Validate album exists if provided
        if (albumId) {
            const album = await Album.findByPk(albumId);
            if (!album) {
                return res.status(404).json({
                    success: false,
                    message: 'Album not found'
                });
            }
        }

        // Create photo entry
        const photo = await Photo.create({
            imageUrl: imageRecord.filePath,
            caption: caption.trim(),
            albumId: albumId || null
        });

        // Update the image registry to change source type
        await imageRecord.update({
            sourceType: 'photo',
            sourceId: photo.id
        });

        res.status(201).json({
            success: true,
            message: 'Image added to gallery successfully',
            photo: {
                id: photo.id,
                imageUrl: photo.imageUrl,
                caption: photo.caption,
                albumId: photo.albumId
            }
        });
    } catch (error) {
        console.error('❌ Error adding to gallery:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add image to gallery'
        });
    }
};

// UPDATED: Upload multiple photos - now registers images
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
            const filename = path.basename(filePath);

            // Optional: Prevent duplicates per album
            const existing = await Photo.findOne({
                where: {
                    imageUrl: filePath,
                    albumId: albumId
                }
            });
            if (existing) continue;

            // Create photo first
            const photo = await Photo.create({
                imageUrl: filePath,
                albumId: albumId,
                caption: caption?.trim() || '',
            });

            // NEW: Register image in centralized registry
            await ImageService.registerImage(
                filename,
                filePath,
                'photo',
                photo.id,
                file.mimetype,
                file.size
            );

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

// UPDATED: Delete photo - now handles image registry
exports.deletePhoto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { deleteFromFS = false } = req.body; // Get delete option from frontend

        console.log('🗑️ Deleting photo:', id, 'Delete from FS:', deleteFromFS);

        const photo = await Photo.findByPk(id);

        if (!photo) return res.status(404).json({ message: 'Photo not found' });

        // Find the image in registry
        const imageRecord = await ImageRegistry.findOne({
            where: {
                sourceType: 'photo',
                sourceId: id
            }
        });

        // Delete image file if requested
        if (deleteFromFS) {
            try {
                if (photo.imageUrl && fs.existsSync(path.join(__dirname, '..', photo.imageUrl))) {
                    fs.unlinkSync(path.join(__dirname, '..', photo.imageUrl));
                    console.log('✅ Image file deleted from filesystem');
                }
            } catch (err) {
                console.warn('⚠️ Could not delete image file:', err.message);
            }
        }

        // Delete from photo table
        await Photo.destroy({
            where: { id: id }
        });

        // NEW: Also delete from image registry if it exists
        if (imageRecord) {
            await ImageRegistry.destroy({
                where: { id: imageRecord.id }
            });
            console.log('✅ Image removed from registry');
        }

        res.status(200).json({
            success: true,
            message: 'Photo deleted successfully'
        });
    } catch (error) {
        console.error('❌ Error in deletePhoto:', error);
        next(error);
    }
};

// UPDATED: Update photo - now updates registry if needed
exports.updatePhoto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const photo = await Photo.findByPk(id);

        if (!photo) return res.status(404).json({ message: 'Photo not found' });

        // If a new image is uploaded, delete old image and update registry
        if (req.file && req.file.path) {
            const newFilePath = req.file.path.replace(/\\/g, '/');
            const newFilename = path.basename(newFilePath);

            // Delete old image file
            try {
                if (photo.imageUrl && fs.existsSync(path.join(__dirname, '..', photo.imageUrl))) {
                    fs.unlinkSync(path.join(__dirname, '..', photo.imageUrl));
                }
            } catch (err) {
                console.warn('Could not delete old image:', err.message);
            }

            // Update photo record
            photo.imageUrl = newFilePath;

            // NEW: Update image registry
            const imageRecord = await ImageRegistry.findOne({
                where: {
                    sourceType: 'photo',
                    sourceId: id
                }
            });

            if (imageRecord) {
                await imageRecord.update({
                    filename: newFilename,
                    filePath: newFilePath,
                    mimeType: req.file.mimetype,
                    fileSize: req.file.size
                });
            } else {
                // Create new registry entry if doesn't exist
                await ImageService.registerImage(
                    newFilename,
                    newFilePath,
                    'photo',
                    id,
                    req.file.mimetype,
                    req.file.size
                );
            }
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

        // Include album info in response
        const updatedPhoto = await Photo.findByPk(id, {
            include: [{ model: Album }]
        });

        res.status(200).json(updatedPhoto);
    } catch (error) {
        next(error);
    }
};

// Keep existing methods (they should work as before)
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

// NEW: Scan and register existing images (for migration)
exports.scanExistingImages = async (req, res, next) => {
    try {
        console.log('🔄 Scanning and registering existing images...');

        await ImageService.scanAndRegisterExistingImages();

        // Also register images from articles and blogs
        await registerArticlesImages();
        await registerBlogsImages();

        res.status(200).json({
            success: true,
            message: 'Image scanning and registration completed successfully'
        });
    } catch (error) {
        console.error('❌ Error scanning images:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to scan and register images'
        });
    }
};

// Helper functions to register existing articles and blogs images
async function registerArticlesImages() {
    try {
        const articles = await Article.findAll();
        for (const article of articles) {
            if (article.image) {
                const filename = path.basename(article.image);
                await ImageService.registerImage(
                    filename,
                    article.image,
                    'article',
                    article.id
                );
            }
        }
        console.log(`✅ Registered ${articles.length} article images`);
    } catch (error) {
        console.error('Error registering article images:', error);
    }
}

async function registerBlogsImages() {
    try {
        const blogs = await Blog.findAll();
        for (const blog of blogs) {
            if (blog.image) {
                const filename = path.basename(blog.image);
                await ImageService.registerImage(
                    filename,
                    blog.image,
                    'blog',
                    blog.id
                );
            }
        }
        console.log(`✅ Registered ${blogs.length} blog images`);
    } catch (error) {
        console.error('Error registering blog images:', error);
    }
}

exports.deleteImageFromRegistry = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { deleteFromFS = false } = req.body;

        console.log('🗑️ Deleting image from registry:', id);

        const imageRecord = await ImageRegistry.findByPk(id);

        if (!imageRecord) {
            return res.status(404).json({
                success: false,
                message: 'Image not found in registry'
            });
        }

        // Delete image file if requested
        if (deleteFromFS) {
            try {
                if (imageRecord.filePath && fs.existsSync(path.join(__dirname, '..', imageRecord.filePath))) {
                    fs.unlinkSync(path.join(__dirname, '..', imageRecord.filePath));
                    console.log('✅ Image file deleted from filesystem');
                }
            } catch (err) {
                console.warn('⚠️ Could not delete image file:', err.message);
            }
        }

        // Delete from registry
        await imageRecord.destroy();

        res.status(200).json({
            success: true,
            message: 'Image deleted from registry successfully'
        });
    } catch (error) {
        console.error('❌ Error deleting image from registry:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete image from registry'
        });
    }
};

// NEW: Convert image to photo (for orphaned images)
exports.convertToPhoto = async (req, res, next) => {
    try {
        const { registryId, caption = '', albumId = null } = req.body;

        console.log('🔄 Converting image to photo:', { registryId, caption, albumId });

        // Find the image in registry
        const imageRecord = await ImageRegistry.findByPk(registryId);

        if (!imageRecord) {
            return res.status(404).json({
                success: false,
                message: 'Image not found in registry'
            });
        }

        // Validate album exists if provided
        if (albumId) {
            const album = await Album.findByPk(albumId);
            if (!album) {
                return res.status(404).json({
                    success: false,
                    message: 'Album not found'
                });
            }
        }

        // Create photo entry
        const photo = await Photo.create({
            imageUrl: imageRecord.filePath,
            caption: caption.trim(),
            albumId: albumId || null
        });

        // Update the image registry to change source type
        await imageRecord.update({
            sourceType: 'photo',
            sourceId: photo.id
        });

        res.status(201).json({
            success: true,
            message: 'Image converted to photo successfully',
            photo: {
                id: photo.id,
                imageUrl: photo.imageUrl,
                caption: photo.caption,
                albumId: photo.albumId
            }
        });
    } catch (error) {
        console.error('❌ Error converting image to photo:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to convert image to photo'
        });
    }
};