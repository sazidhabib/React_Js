const { DataTypes } = require("sequelize");
const sequelize = require('../db/database');

const HeroSection = sequelize.define("HeroSection", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Title is required'
            },
            notEmpty: {
                msg: 'Title cannot be empty'
            }
        }
    },
    lines: {
        type: DataTypes.JSON, // Store array as JSON in MySQL
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Lines are required'
            },
            isValidLines(value) {
                if (!Array.isArray(JSON.parse(value)) || JSON.parse(value).length !== 3) {
                    throw new Error('Exactly 3 lines of text are required');
                }

                const lines = JSON.parse(value);
                lines.forEach((line, index) => {
                    if (typeof line !== 'string' || line.trim() === '') {
                        throw new Error(`Line ${index + 1} cannot be empty`);
                    }
                });
            }
        }
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'hero_sections',
    timestamps: true,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    hooks: {
        beforeValidate: (heroSection) => {
            if (heroSection.lines && typeof heroSection.lines === 'object') {
                heroSection.lines = JSON.stringify(heroSection.lines);
            }
        },
        afterFind: (result) => {
            if (Array.isArray(result)) {
                result.forEach(heroSection => {
                    if (heroSection.lines && typeof heroSection.lines === 'string') {
                        heroSection.lines = JSON.parse(heroSection.lines);
                    }
                });
            } else if (result && result.lines && typeof result.lines === 'string') {
                result.lines = JSON.parse(result.lines);
            }
            return result;
        }
    }
});

module.exports = HeroSection;