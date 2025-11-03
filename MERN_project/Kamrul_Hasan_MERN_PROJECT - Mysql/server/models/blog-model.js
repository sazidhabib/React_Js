const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Blog = sequelize.define("Blog", {
    _id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING, // store image path
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // prevent duplicate title
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    publishDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    author: {
        type: DataTypes.INTEGER, // foreign key (User ID)
        allowNull: false,
    },
    UpdatedAt: { // Add this new field
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'blogpost',
    timestamps: true, // This handles createdAt and updatedAt automatically
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci"
});

module.exports = Blog;