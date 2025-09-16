const sequelize = require('../db/database');

// Import models
const Album = require('./album');
const Photo = require('./photo');

// Set up associations
Album.hasMany(Photo, {
    foreignKey: 'albumId',
    onDelete: 'CASCADE'
});
Photo.belongsTo(Album, {
    foreignKey: 'albumId'
});

// Export models and sequelize
module.exports = {
    sequelize,
    Album,
    Photo
};