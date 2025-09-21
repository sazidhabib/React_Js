const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Column = sequelize.define("Column", {
    colOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    width: {
        type: DataTypes.INTEGER,
        defaultValue: 12,
    },
    mergedWith: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    contentType: {
        type: DataTypes.STRING,
    },
    tag: {
        type: DataTypes.STRING,
    },
}, {
    tableName: "columns",
    //timestamps: false,
});

module.exports = Column;
