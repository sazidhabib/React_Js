const { DataTypes } = require("sequelize");
const sequelize = require('../db/database');

const Section = sequelize.define("Section", {
    _id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('about', 'jetukuboliniage', 'bookreading', 'music'),
        allowNull: false
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
        type: DataTypes.STRING,
        allowNull: true,
    },
    isVisible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    tableName: 'sections',
    timestamps: true,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci"
});

const syncSection = async () => {
    try {
        await Section.sync({ alter: true });
        console.log("Section table synced with is_visible field");
    } catch (error) {
        console.error("Error syncing Section table:", error);
    }
};
syncSection();

module.exports = Section;