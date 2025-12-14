// controllers/news-controller.js
const News = require("../models/news-model");
const NewsTag = require("../models/news-tag-model");
const NewsCategory = require("../models/news-category-model");
const Tag = require("../models/tag-model");
const Menu = require("../models/menu-model");
const Author = require("../models/author-model");
const ImageService = require('../services/imageService');
const ImageRegistry = require('../models/imageRegistry');
const fs = require("fs");
const path = require("path");
const { Sequelize } = require('sequelize');
const { Op } = require("sequelize");


console.log('=== MODELS CHECK ===');
console.log('News model:', News ? 'Loaded' : 'Not loaded');
console.log('Menu model:', Menu ? 'Loaded' : 'Not loaded');
console.log('Tag model:', Tag ? 'Loaded' : 'Not loaded');
console.log('Author model:', Author ? 'Loaded' : 'Not loaded');

// ✅ Create News Post
const createNews = async (req, res) => {
    try {
        console.log('=== CREATE NEWS CONTROLLER ===');
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);

        const {
            newsHeadline,
            highlight,
            alternativeHeadline,
            authorId,
            shortDescription,
            tagIds, // array of tag IDs
            categoryIds, // array of category IDs
            content,
            imageCaption,
            videoLink,
            newsSchedule,
            metaTitle,
            metaKeywords,
            metaDescription,
            status
        } = req.body;

        // Generate slug from newsHeadline
        const slug = newsHeadline.toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');

        if (!newsHeadline || !authorId || !content) {
            return res.status(400).json({
                message: "News Headline, Author, and Content are required"
            });
        }

        // Check if slug already exists
        const existingSlug = await News.findOne({ where: { slug } });
        if (existingSlug) {
            return res.status(409).json({
                message: "A news post with this headline already exists."
            });
        }

        // FIXED: Handle tagIds parsing properly
        let parsedTagIds = [];
        if (tagIds) {
            if (typeof tagIds === 'string') {
                try {
                    // Try parsing if it's a JSON string
                    parsedTagIds = JSON.parse(tagIds);
                } catch (error) {
                    // If parsing fails, assume it's a comma-separated string
                    parsedTagIds = tagIds.split(',').filter(id => id.trim() !== '');
                }
            } else if (Array.isArray(tagIds)) {
                // If it's already an array, use it directly
                parsedTagIds = tagIds;
            }
        }

        // FIXED: Handle categoryIds parsing properly
        let parsedCategoryIds = [];
        if (categoryIds) {
            if (typeof categoryIds === 'string') {
                try {
                    // Try parsing if it's a JSON string
                    parsedCategoryIds = JSON.parse(categoryIds);
                } catch (error) {
                    // If parsing fails, assume it's a single ID or comma-separated
                    parsedCategoryIds = categoryIds.split(',').filter(id => id.trim() !== '');
                }
            } else if (Array.isArray(categoryIds)) {
                // If it's already an array, use it directly
                parsedCategoryIds = categoryIds;
            } else {
                // If it's a single value, put it in an array
                parsedCategoryIds = [categoryIds];
            }
        }

        console.log('parsedTagIds:', parsedTagIds);
        console.log('parsedCategoryIds:', parsedCategoryIds);

        // Handle file uploads
        const leadImage = req.files?.leadImage ? `uploads/${req.files.leadImage[0].filename}` : req.body.leadImagePath;
        const thumbImage = req.files?.thumbImage ? `uploads/${req.files.thumbImage[0].filename}` : req.body.thumbImagePath;
        const metaImage = req.files?.metaImage ? `uploads/${req.files.metaImage[0].filename}` : req.body.metaImagePath;

        // Create full paths for images
        const leadImagePath = leadImage ? `uploads/${leadImage}` : null;
        const thumbImagePath = thumbImage ? `uploads/${thumbImage}` : null;
        const metaImagePath = metaImage ? `uploads/${metaImage}` : null;

        const newNews = await News.create({
            newsHeadline,
            highlight,
            alternativeHeadline,
            authorId: parseInt(authorId),
            shortDescription,
            content,
            leadImage: leadImagePath,
            thumbImage: thumbImagePath,
            imageCaption,
            videoLink,
            newsSchedule: newsSchedule || null,
            metaTitle: metaTitle || newsHeadline,
            metaKeywords,
            metaDescription: metaDescription || shortDescription,
            metaImage: metaImagePath,
            status: status || 'draft',
            slug
        });

        console.log('=== NEWS CREATION DEBUG ===');
        console.log('New News ID:', newNews.id);
        console.log('New News data:', {
            id: newNews.id,
            newsHeadline: newNews.newsHeadline,
            status: newNews.status,
            authorId: newNews.authorId,
            createdAt: newNews.createdAt
        });

        // Verify it was saved to database
        const savedNews = await News.findByPk(newNews.id);
        console.log('Retrieved from database:', savedNews ? 'Yes' : 'No');
        if (savedNews) {
            console.log('Saved news details:', {
                id: savedNews.id,
                newsHeadline: savedNews.newsHeadline,
                status: savedNews.status,
                createdAt: savedNews.createdAt
            });
        }

        // Create associations
        if (parsedTagIds.length > 0) {
            const newsTags = parsedTagIds.map(tagId => ({
                newsId: newNews.id,
                tagId: parseInt(tagId)
            }));
            await NewsTag.bulkCreate(newsTags);
        }

        if (parsedCategoryIds.length > 0) {
            const newsCategories = parsedCategoryIds.map(categoryId => ({
                newsId: newNews.id,
                categoryId: parseInt(categoryId)
            }));
            await NewsCategory.bulkCreate(newsCategories);
        }

        // REGISTER IMAGES IN CENTRALIZED REGISTRY
        try {
            if (leadImagePath) {
                await ImageService.registerImage(
                    leadImage,
                    leadImagePath,
                    'news',
                    newNews.id
                );
            }
            if (thumbImagePath) {
                await ImageService.registerImage(
                    thumbImage,
                    thumbImagePath,
                    'news',
                    newNews.id
                );
            }
            if (metaImagePath) {
                await ImageService.registerImage(
                    metaImage,
                    metaImagePath,
                    'news',
                    newNews.id
                );
            }
            console.log(`✅ Registered news images for news ID: ${newNews.id}`);
        } catch (imageError) {
            console.error('Error registering news images:', imageError);
            // Don't fail the request if image registration fails
        }

        // Fetch complete news with associations
        const completeNews = await News.findByPk(newNews.id, {
            include: [
                { model: Tag, through: { attributes: [] } },
                { model: Menu, through: { attributes: [] } },
                { model: Author }
            ]
        });

        res.status(201).json({
            message: "News Post Created Successfully",
            news: completeNews
        });
    } catch (error) {
        console.error("Create News Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// ✅ Get All News Posts - SIMPLIFIED VERSION
const getAllNews = async (req, res) => {
    try {
        console.log('=== GET ALL NEWS CONTROLLER ===');

        const {
            page = 1,
            limit = 10,
            search = '',
            status,
            category,
            tag,
            author
        } = req.query;

        const offset = (page - 1) * limit;

        // SIMPLIFY: First, try without includes
        let whereClause = {};

        // Search functionality
        if (search) {
            whereClause = {
                [Op.or]: [
                    { newsHeadline: { [Op.like]: `%${search}%` } },
                    { alternativeHeadline: { [Op.like]: `%${search}%` } },
                    { shortDescription: { [Op.like]: `%${search}%` } }
                ]
            };
        }

        // Filter by status
        if (status) {
            whereClause.status = status;
        }

        console.log('Querying News with where:', whereClause);

        // Try simple query first
        const { count, rows } = await News.findAndCountAll({
            where: whereClause,
            order: [["createdAt", "DESC"]],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        console.log(`Found ${count} news, returning ${rows.length} rows`);

        if (rows.length > 0) {
            console.log('First news item:', {
                id: rows[0].id,
                headline: rows[0].newsHeadline,
                status: rows[0].status
            });
        }

        // Now try to include associations for the returned rows
        const newsWithAssociations = await Promise.all(
            rows.map(async (newsItem) => {
                try {
                    const fullNews = await News.findByPk(newsItem.id, {
                        include: [
                            {
                                model: Tag,
                                through: { attributes: [] },
                                attributes: ['id', 'name', 'slug']
                            },
                            {
                                model: Menu,
                                through: { attributes: [] },
                                attributes: ['id', 'name', 'slug']
                            },
                            {
                                model: Author,
                                attributes: ['id', 'name']
                            }
                        ]
                    });
                    return fullNews || newsItem;
                } catch (error) {
                    console.error(`Error loading associations for news ${newsItem.id}:`, error.message);
                    return newsItem; // Return basic news if associations fail
                }
            })
        );

        res.status(200).json({
            news: newsWithAssociations,
            totalCount: count,
            currentPage: parseInt(page),
            totalPages: Math.ceil(count / limit),
            hasNext: page * limit < count,
            hasPrev: page > 1
        });
    } catch (error) {
        console.error("Get All News Error:", error);
        console.error("Error stack:", error.stack);

        // Fallback: Direct SQL query
        try {
            const sequelize = require("../db/database");
            const [newsRows] = await sequelize.query(
                "SELECT id, newsHeadline, status, authorId, createdAt FROM news ORDER BY createdAt DESC LIMIT 10"
            );

            res.status(200).json({
                news: newsRows,
                totalCount: newsRows.length,
                currentPage: 1,
                totalPages: 1,
                hasNext: false,
                hasPrev: false,
                error: "Using SQL fallback due to ORM error"
            });
        } catch (sqlError) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
};

// ✅ Get Single News Post
const getNews = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id, {
            include: [
                {
                    model: Tag,
                    through: { attributes: [] },
                    attributes: ['id', 'name', 'slug']
                },
                {
                    model: Menu,
                    through: { attributes: [] },
                    attributes: ['id', 'name', 'slug']
                },
                {
                    model: Author,
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        if (!news) {
            return res.status(404).json({ message: "News Post Not Found" });
        }

        // Increment views
        await news.increment('views');

        res.status(200).json(news);
    } catch (error) {
        console.error("Get News Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// ✅ Get News by Slug
const getNewsBySlug = async (req, res) => {
    try {
        const news = await News.findOne({
            where: { slug: req.params.slug },
            include: [
                {
                    model: Tag,
                    through: { attributes: [] },
                    attributes: ['id', 'name', 'slug']
                },
                {
                    model: Menu,
                    through: { attributes: [] },
                    attributes: ['id', 'name', 'slug']
                },
                {
                    model: Author,
                    attributes: ['id', 'name', 'email', 'image']
                }
            ]
        });

        if (!news) {
            return res.status(404).json({ message: "News Post Not Found" });
        }

        // Increment views
        await news.increment('views');

        res.status(200).json(news);
    } catch (error) {
        console.error("Get News by Slug Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// ✅ Update News Post
const updateNews = async (req, res) => {
    try {
        const {
            newsHeadline,
            highlight,
            alternativeHeadline,
            authorId,
            shortDescription,
            tagIds,
            categoryIds,
            content,
            imageCaption,
            videoLink,
            newsSchedule,
            metaTitle,
            metaKeywords,
            metaDescription,
            status
        } = req.body;

        const existingNews = await News.findByPk(req.params.id);
        if (!existingNews) {
            return res.status(404).json({ message: "News Post Not Found" });
        }

        let slug = existingNews.slug;
        if (newsHeadline && newsHeadline !== existingNews.newsHeadline) {
            slug = newsHeadline.toLowerCase()
                .replace(/[^a-z0-9 -]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');

            // Check if new slug already exists
            const duplicateSlug = await News.findOne({
                where: {
                    slug,
                    id: { [Op.ne]: req.params.id }
                }
            });

            if (duplicateSlug) {
                return res.status(409).json({
                    message: "Another news post with this headline already exists."
                });
            }
        }

        // Parse tagIds and categoryIds
        const parsedTagIds = tagIds ? JSON.parse(tagIds) : [];
        const parsedCategoryIds = categoryIds ? JSON.parse(categoryIds) : [];

        // Handle file uploads and delete old files
        const updateData = {
            newsHeadline: newsHeadline || existingNews.newsHeadline,
            highlight: highlight !== undefined ? highlight : existingNews.highlight,
            alternativeHeadline: alternativeHeadline !== undefined ? alternativeHeadline : existingNews.alternativeHeadline,
            authorId: authorId ? parseInt(authorId) : existingNews.authorId,
            shortDescription: shortDescription !== undefined ? shortDescription : existingNews.shortDescription,
            content: content || existingNews.content,
            imageCaption: imageCaption !== undefined ? imageCaption : existingNews.imageCaption,
            videoLink: videoLink !== undefined ? videoLink : existingNews.videoLink,
            newsSchedule: newsSchedule !== undefined ? newsSchedule : existingNews.newsSchedule,
            metaTitle: metaTitle !== undefined ? metaTitle : existingNews.metaTitle,
            metaKeywords: metaKeywords !== undefined ? metaKeywords : existingNews.metaKeywords,
            metaDescription: metaDescription !== undefined ? metaDescription : existingNews.metaDescription,
            status: status || existingNews.status,
            slug
        };

        // Handle lead image
        if (req.files?.leadImage) {
            // Delete old lead image
            if (existingNews.leadImage) {
                const oldImagePath = path.join(__dirname, "..", existingNews.leadImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
                // Remove from image registry
                await ImageRegistry.destroy({
                    where: {
                        sourceType: 'news',
                        sourceId: req.params.id,
                        filePath: existingNews.leadImage
                    }
                });
            }
            updateData.leadImage = `uploads/${req.files.leadImage[0].filename}`;

            // Register new image
            await ImageService.registerImage(
                req.files.leadImage[0].filename,
                updateData.leadImage,
                'news',
                req.params.id
            );
        }

        // Handle thumb image
        if (req.files?.thumbImage) {
            if (existingNews.thumbImage) {
                const oldImagePath = path.join(__dirname, "..", existingNews.thumbImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
                // Remove from image registry
                await ImageRegistry.destroy({
                    where: {
                        sourceType: 'news',
                        sourceId: req.params.id,
                        filePath: existingNews.thumbImage
                    }
                });
            }
            updateData.thumbImage = `uploads/${req.files.leadImage[0].filename}`;

            // Register new image
            await ImageService.registerImage(
                req.files.thumbImage[0].filename,
                updateData.thumbImage,
                'news',
                req.params.id
            );
        }

        // Handle meta image
        if (req.files?.metaImage) {
            if (existingNews.metaImage) {
                const oldImagePath = path.join(__dirname, "..", existingNews.metaImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
                // Remove from image registry
                await ImageRegistry.destroy({
                    where: {
                        sourceType: 'news',
                        sourceId: req.params.id,
                        filePath: existingNews.metaImage
                    }
                });
            }
            updateData.metaImage = req.files.metaImage[0].filename;

            // Register new image
            await ImageService.registerImage(
                req.files.metaImage[0].filename,
                updateData.metaImage,
                'news',
                req.params.id
            );
        }

        const updatedNews = await existingNews.update(updateData);

        // Update associations
        if (tagIds !== undefined) {
            await NewsTag.destroy({ where: { newsId: req.params.id } });
            if (parsedTagIds.length > 0) {
                const newsTags = parsedTagIds.map(tagId => ({
                    newsId: req.params.id,
                    tagId: parseInt(tagId)
                }));
                await NewsTag.bulkCreate(newsTags);
            }
        }

        if (categoryIds !== undefined) {
            await NewsCategory.destroy({ where: { newsId: req.params.id } });
            if (parsedCategoryIds.length > 0) {
                const newsCategories = parsedCategoryIds.map(categoryId => ({
                    newsId: req.params.id,
                    categoryId: parseInt(categoryId)
                }));
                await NewsCategory.bulkCreate(newsCategories);
            }
        }

        // Fetch updated news with associations
        const completeNews = await News.findByPk(req.params.id, {
            include: [
                { model: Tag, through: { attributes: [] } },
                { model: Menu, through: { attributes: [] } },
                { model: Author }
            ]
        });

        res.status(200).json({
            message: "News Post Updated Successfully",
            news: completeNews
        });
    } catch (error) {
        console.error("Update News Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// ✅ Delete News Post
const deleteNews = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if (!news) {
            return res.status(404).json({ message: "News Post Not Found" });
        }

        // Delete associated images
        const imageFields = ['leadImage', 'thumbImage', 'metaImage'];
        for (const field of imageFields) {
            if (news[field]) {
                const imagePath = path.join(__dirname, "..", news[field]);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
        }

        // Delete from image registry
        await ImageRegistry.destroy({
            where: {
                sourceType: 'news',
                sourceId: req.params.id
            }
        });

        // Delete associations
        await NewsTag.destroy({ where: { newsId: req.params.id } });
        await NewsCategory.destroy({ where: { newsId: req.params.id } });

        await news.destroy();
        res.status(200).json({ message: "News Post Deleted Successfully" });
    } catch (error) {
        console.error("Delete News Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// ✅ Bulk Delete News Posts
const bulkDeleteNews = async (req, res) => {
    try {
        const { newsIds } = req.body;

        if (!newsIds || !Array.isArray(newsIds) || newsIds.length === 0) {
            return res.status(400).json({ message: "News IDs are required" });
        }

        const newsPosts = await News.findAll({
            where: { id: newsIds }
        });

        // Delete images and associations for all news posts
        for (const news of newsPosts) {
            const imageFields = ['leadImage', 'thumbImage', 'metaImage'];
            for (const field of imageFields) {
                if (news[field]) {
                    const imagePath = path.join(__dirname, "..", "uploads", "news", news[field]);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                }
            }

            await NewsTag.destroy({ where: { newsId: news.id } });
            await NewsCategory.destroy({ where: { newsId: news.id } });
        }

        await News.destroy({
            where: { id: newsIds }
        });

        res.status(200).json({
            message: `${newsIds.length} news post(s) deleted successfully`
        });
    } catch (error) {
        console.error("Bulk Delete News Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports = {
    createNews,
    getAllNews,
    getNews,
    getNewsBySlug,
    updateNews,
    deleteNews,
    bulkDeleteNews
};
