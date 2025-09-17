const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Page = sequelize.define("Page", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "pages",
    timestamps: false,
});

module.exports = Page;
