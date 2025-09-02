const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Videos = sequelize.define("Videos", {
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
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    src: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isUrl: true
        }
    },
    thumbnail: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users', // This should match your users table name
            key: 'id'
        }
    }
}, {
    timestamps: true,
    tableName: 'videos' // explicit table name
});

module.exports = Videos;