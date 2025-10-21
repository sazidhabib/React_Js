// controllers/news-controller.js
const News = require("../models/news-model");
const NewsTag = require("../models/news-tag-model");
const NewsCategory = require("../models/news-category-model");
const Tag = require("../models/tag-model");
const Category = require("../models/category-model");
const Author = require("../models/author-model");
const fs = require("fs");
const path = require("path");
const { Sequelize } = require('sequelize');
const { Op } = require("sequelize");

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

        // Parse tagIds and categoryIds
        const parsedTagIds = tagIds ? JSON.parse(tagIds) : [];
        const parsedCategoryIds = categoryIds ? JSON.parse(categoryIds) : [];

        // Handle file uploads
        const leadImage = req.files?.leadImage ? req.files.leadImage[0].filename : null;
        const thumbImage = req.files?.thumbImage ? req.files.thumbImage[0].filename : null;
        const metaImage = req.files?.metaImage ? req.files.metaImage[0].filename : null;

        const newNews = await News.create({
            newsHeadline,
            highlight,
            alternativeHeadline,
            authorId: parseInt(authorId),
            shortDescription,
            content,
            leadImage,
            thumbImage,
            imageCaption,
            videoLink,
            newsSchedule: newsSchedule || null,
            metaTitle: metaTitle || newsHeadline,
            metaKeywords,
            metaDescription: metaDescription || shortDescription,
            metaImage,
            status: status || 'draft',
            slug
        });

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

        // Fetch complete news with associations
        const completeNews = await News.findByPk(newNews.id, {
            include: [
                { model: Tag, through: { attributes: [] } },
                { model: Category, through: { attributes: [] } },
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

// ✅ Get All News Posts
const getAllNews = async (req, res) => {
    try {
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

        let whereClause = {};
        let include = [
            {
                model: Tag,
                through: { attributes: [] },
                attributes: ['id', 'name', 'slug']
            },
            {
                model: Category,
                through: { attributes: [] },
                attributes: ['id', 'name', 'slug']
            },
            {
                model: Author,
                attributes: ['id', 'name']
            }
        ];

        // Search functionality
        if (search) {
            whereClause = {
                [Op.or]: [
                    { newsHeadline: { [Op.like]: `%${search}%` } },
                    { alternativeHeadline: { [Op.like]: `%${search}%` } },
                    { shortDescription: { [Op.like]: `%${search}%` } },
                    { content: { [Op.like]: `%${search}%` } }
                ]
            };
        }

        // Filter by status
        if (status) {
            whereClause.status = status;
        }

        // Filter by category
        if (category) {
            include[1].where = { slug: category };
        }

        // Filter by tag
        if (tag) {
            include[0].where = { slug: tag };
        }

        // Filter by author
        if (author) {
            include[2].where = { id: author };
        }

        const { count, rows } = await News.findAndCountAll({
            where: whereClause,
            include: include,
            order: [["createdAt", "DESC"]],
            limit: parseInt(limit),
            offset: parseInt(offset),
            distinct: true
        });

        res.status(200).json({
            news: rows,
            totalCount: count,
            currentPage: parseInt(page),
            totalPages: Math.ceil(count / limit),
            hasNext: page * limit < count,
            hasPrev: page > 1
        });
    } catch (error) {
        console.error("Get All News Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
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
                    model: Category,
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
                    model: Category,
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
                const oldImagePath = path.join(__dirname, "..", "uploads", "news", existingNews.leadImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateData.leadImage = req.files.leadImage[0].filename;
        }

        // Handle thumb image
        if (req.files?.thumbImage) {
            if (existingNews.thumbImage) {
                const oldImagePath = path.join(__dirname, "..", "uploads", "news", existingNews.thumbImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateData.thumbImage = req.files.thumbImage[0].filename;
        }

        // Handle meta image
        if (req.files?.metaImage) {
            if (existingNews.metaImage) {
                const oldImagePath = path.join(__dirname, "..", "uploads", "news", existingNews.metaImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateData.metaImage = req.files.metaImage[0].filename;
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
                { model: Category, through: { attributes: [] } },
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
                const imagePath = path.join(__dirname, "..", "uploads", "news", news[field]);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
        }

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