const sequelize = require('../db/database');
const Album = require('./album');
const Photo = require('./photo');
const Page = require('./page');
const PageSection = require('./pageSection');
const Row = require('./row');
const Column = require('./column');

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

// Export everything
module.exports = {
    sequelize,
    Album,
    Photo,
    Page,
    PageSection,
    Row,
    Column,
};
