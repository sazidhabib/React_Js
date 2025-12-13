const sequelize = require('../db/database');
const Album = require('./album');
const Photo = require('./photo');
const Page = require('./page');
const PageSection = require('./pageSection');
const Row = require('./row');
const Column = require('./column');
const User = require('./user-model');
const Article = require('./article-model');
const Blog = require('./blog-model');

// Import your new models
const Tag = require('./tag-model');
const Menu = require('./menu-model'); // Make sure you have this
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
News.belongsToMany(Menu, {
    through: NewsCategory,
    foreignKey: 'newsId',
    otherKey: 'categoryId',
    onDelete: 'CASCADE'
});
Menu.belongsToMany(News, {
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

Menu.hasMany(NewsCategory, {
    foreignKey: 'categoryId',
    onDelete: 'CASCADE'
});
NewsCategory.belongsTo(Menu, {
    foreignKey: 'categoryId'
});

// Add after other associations
ImageRegistry.belongsTo(Article, {
    foreignKey: 'sourceId',
    constraints: false,
    as: 'article',
    scope: {
        sourceType: 'article'
    }
});

ImageRegistry.belongsTo(Blog, {
    foreignKey: 'sourceId',
    constraints: false,
    as: 'blog',
    scope: {
        sourceType: 'blog'
    }
});

ImageRegistry.belongsTo(Photo, {
    foreignKey: 'sourceId',
    constraints: false,
    as: 'photo',
    scope: {
        sourceType: 'photo'
    }
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
    Menu,
    Author,
    News,
    NewsTag,
    NewsCategory,
    ImageRegistry,
};