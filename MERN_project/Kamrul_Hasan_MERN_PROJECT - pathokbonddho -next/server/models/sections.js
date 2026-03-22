const { DataTypes } = require("sequelize");
const sequelize = require('../db/database');

const Section = sequelize.define("Section", {
    type: {
        type: DataTypes.ENUM('about', 'jetukuboliniage', 'bookreading', 'music'),
        allowNull: false,
        unique: true // Ensures only one section per type
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING, // store image path
        allowNull: true,
    },
}, {
    tableName: 'sections',
    timestamps: true,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci"
});

module.exports = Section;