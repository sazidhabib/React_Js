const { DataTypes } = require("sequelize");
const sequelize = require('../db/database');

const Article = sequelize.define("Article", {
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
  author: {
    type: DataTypes.INTEGER, // foreign key (User ID)
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // store image path
  },
  publishDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true,
  charset: "utf8mb4",
  collate: "utf8mb4_unicode_ci"
});

module.exports = Article;
