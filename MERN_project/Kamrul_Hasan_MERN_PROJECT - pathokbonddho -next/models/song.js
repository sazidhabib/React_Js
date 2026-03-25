const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Song = sequelize.define("Song", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    youtubeUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isUrl: true
        }
    },
    position: {
        type: DataTypes.INTEGER,
        defaultValue: 9999
    }
}, {
    timestamps: true,
    tableName: 'songs' // explicit table name
});

module.exports = Song;