const fs = require('fs');
const path = require('path');
const ImageRegistry = require('../models/imageRegistry');
const Article = require('../models/article-model');
const Blog = require('../models/blog-model');
const Photo = require('../models/photo-model');

class ImageService {
    // Register a new image
    static async registerImage(filename, filePath, sourceType, sourceId, mimeType = null, fileSize = null) {
        try {
            return await ImageRegistry.create({
                filename,
                filePath,
                sourceType,
                sourceId,
                mimeType,
                fileSize
            });
        } catch (error) {
            console.error('Error registering image:', error);
            throw error;
        }
    }

    // Get all images with pagination and filtering
    static async getAllImages(page = 1, limit = 10, sourceType = null) {
        try {
            const offset = (page - 1) * limit;

            const whereClause = {};
            if (sourceType) {
                whereClause.sourceType = sourceType;
            }

            const { count, rows } = await ImageRegistry.findAndCountAll({
                where: whereClause,
                limit: limit,
                offset: offset,
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: Article,
                        as: 'article',
                        attributes: ['id', 'title'],
                        required: false
                    },
                    {
                        model: Blog,
                        as: 'blog',
                        attributes: ['id', 'title'],
                        required: false
                    },
                    {
                        model: Photo,
                        as: 'photo',
                        attributes: ['id', 'caption', 'albumId'],
                        required: false
                    }
                ]
            });

            return {
                images: rows,
                totalCount: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            };
        } catch (error) {
            console.error('Error fetching images:', error);
            throw error;
        }
    }

    // Scan uploads directory and register existing images
    static async scanAndRegisterExistingImages() {
        const uploadsDir = path.join(__dirname, '../uploads');

        try {
            const files = fs.readdirSync(uploadsDir);
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

            for (const file of files) {
                const fileExt = path.extname(file).toLowerCase();
                if (imageExtensions.includes(fileExt)) {
                    // Check if image already registered
                    const existing = await ImageRegistry.findOne({ where: { filename: file } });
                    if (!existing) {
                        await ImageRegistry.create({
                            filename: file,
                            filePath: `uploads/${file}`,
                            sourceType: 'other',
                            sourceId: 0 // Or you can create a system to track orphaned images
                        });
                    }
                }
            }
        } catch (error) {
            console.error('Error scanning uploads directory:', error);
        }
    }
}

module.exports = ImageService;