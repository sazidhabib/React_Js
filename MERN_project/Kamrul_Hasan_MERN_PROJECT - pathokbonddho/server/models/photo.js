const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Photo = sequelize.define("Photo", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    caption: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    albumId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'albums',
            key: 'id'
        }
    }
}, {
    timestamps: true,
    tableName: 'photos'
});

// Add association
Photo.associate = function (models) {
    Photo.hasOne(models.ImageRegistry, {
        foreignKey: 'sourceId',
        constraints: false,
        scope: {
            sourceType: 'photo'
        }
    });
};

module.exports = Photo;