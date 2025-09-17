const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const PageSection = sequelize.define("PageSection", {
    layoutType: {
        type: DataTypes.ENUM("grid", "flex"),
        allowNull: false,
    },
}, {
    tableName: "page_sections", // renamed because 'sections' already exists
    timestamps: false,
});

module.exports = PageSection;
