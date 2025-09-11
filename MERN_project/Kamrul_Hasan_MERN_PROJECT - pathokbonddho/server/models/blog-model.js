const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Blog = sequelize.define("Blog", {
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
        allowNull: true, // Optional, but you can make it required if you like
    },
    author: {
        type: DataTypes.INTEGER, // foreign key (User ID)
        allowNull: false,
    },

}, {
    timestamps: true,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci"
});


module.exports = Blog;
