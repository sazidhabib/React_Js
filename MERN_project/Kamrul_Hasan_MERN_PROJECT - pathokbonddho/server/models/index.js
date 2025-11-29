const sequelize = require('../db/database');
const Album = require('./album');
const Photo = require('./photo');
const Page = require('./page');
const PageSection = require('./pageSection');
const Row = require('./row');
const Column = require('./column');
const User = require('./user-model');

// Import your new models
const Tag = require('./tag-model');
const Category = require('./menu-model'); // Make sure you have this
const Author = require('./author-model'); // Make sure you have this
const News = require('./news-model');
const NewsTag = require('./news-tag-model');
const NewsCategory = require('./news-category-model');
const ImageRegistry = require('./imageRegistry');

// Associations for Photo Gallery
Album.hasMany(Photo, {
    foreignKey: 'albumId',
    onDelete: 'CASCADE',
});
Photo.belongsTo(Album, {
    foreignKey: 'albumId',
});

// Associations for Page Builder
Page.hasMany(PageSection, {
    foreignKey: 'pageId',
    onDelete: 'CASCADE',
});
PageSection.belongsTo(Page, {
    foreignKey: 'pageId',
});

PageSection.hasMany(Row, {
    foreignKey: 'sectionId',
    onDelete: 'CASCADE',
});
Row.belongsTo(PageSection, {
    foreignKey: 'sectionId',
});

Row.hasMany(Column, {
    foreignKey: 'rowId',
    onDelete: 'CASCADE',
});
Column.belongsTo(Row, {
    foreignKey: 'rowId',
});

// ========== NEWS ASSOCIATIONS ==========

// News ↔ Author (Many-to-One)
News.belongsTo(Author, {
    foreignKey: 'authorId',
    onDelete: 'CASCADE'
});
Author.hasMany(News, {
    foreignKey: 'authorId',
    onDelete: 'CASCADE'
});

// News ↔ Tag (Many-to-Many through NewsTag)
News.belongsToMany(Tag, {
    through: NewsTag,
    foreignKey: 'newsId',
    otherKey: 'tagId',
    onDelete: 'CASCADE'
});
Tag.belongsToMany(News, {
    through: NewsTag,
    foreignKey: 'tagId',
    otherKey: 'newsId',
    onDelete: 'CASCADE'
});

// News ↔ Category (Many-to-Many through NewsCategory)
News.belongsToMany(Category, {
    through: NewsCategory,
    foreignKey: 'newsId',
    otherKey: 'categoryId',
    onDelete: 'CASCADE'
});
Category.belongsToMany(News, {
    through: NewsCategory,
    foreignKey: 'categoryId',
    otherKey: 'newsId',
    onDelete: 'CASCADE'
});

// Direct associations for easier querying
News.hasMany(NewsTag, {
    foreignKey: 'newsId',
    onDelete: 'CASCADE'
});
NewsTag.belongsTo(News, {
    foreignKey: 'newsId'
});

Tag.hasMany(NewsTag, {
    foreignKey: 'tagId',
    onDelete: 'CASCADE'
});
NewsTag.belongsTo(Tag, {
    foreignKey: 'tagId'
});

News.hasMany(NewsCategory, {
    foreignKey: 'newsId',
    onDelete: 'CASCADE'
});
NewsCategory.belongsTo(News, {
    foreignKey: 'newsId'
});

Category.hasMany(NewsCategory, {
    foreignKey: 'categoryId',
    onDelete: 'CASCADE'
});
NewsCategory.belongsTo(Category, {
    foreignKey: 'categoryId'
});

// Add after other associations
ImageRegistry.belongsTo(Article, {
    foreignKey: 'sourceId',
    constraints: false,
    as: 'article'
});

ImageRegistry.belongsTo(Blog, {
    foreignKey: 'sourceId',
    constraints: false,
    as: 'blog'
});

ImageRegistry.belongsTo(Photo, {
    foreignKey: 'sourceId',
    constraints: false,
    as: 'photo'
});


// Export everything
module.exports = {
    sequelize,
    Album,
    Photo,
    Page,
    PageSection,
    Row,
    Column,
    User,
    // Export new models
    Tag,
    Category,
    Author,
    News,
    NewsTag,
    NewsCategory,
    ImageRegistry,
};