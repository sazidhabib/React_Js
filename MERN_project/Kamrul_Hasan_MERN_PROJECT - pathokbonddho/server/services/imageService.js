const fs = require('fs');
const path = require('path');
const ImageRegistry = require('../models/imageRegistry');


class ImageService {
    // Register a new image
    static async registerImage(filename, filePath, sourceType, sourceId, mimeType = null, fileSize = null) {
        try {
            // Check if already exists
            const existing = await ImageRegistry.findOne({
                where: {
                    filename,
                    sourceType,
                    sourceId
                }
            });

            if (existing) {
                return existing;
            }

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
            if (!fs.existsSync(uploadsDir)) {
                console.log('Uploads directory does not exist');
                return;
            }

            const files = fs.readdirSync(uploadsDir);
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

            let registeredCount = 0;

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
                            sourceId: 0
                        });
                        registeredCount++;
                    }
                }
            }

            console.log(`✅ Registered ${registeredCount} new images from uploads directory`);
        } catch (error) {
            console.error('Error scanning uploads directory:', error);
        }
    }
}

module.exports = ImageService;