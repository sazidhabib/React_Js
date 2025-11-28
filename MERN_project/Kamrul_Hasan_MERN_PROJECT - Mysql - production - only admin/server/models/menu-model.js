const { DataTypes } = require("sequelize");
const sequelize = require('../db/database');

const Menu = sequelize.define("Menu", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Menu name is required'
            },
            notEmpty: {
                msg: 'Menu name cannot be empty'
            }
        },
        unique: {
            name: 'unique_menu_name',
            msg: 'Menu name already exists'
        }
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Menu path is required'
            },
            notEmpty: {
                msg: 'Menu path cannot be empty'
            }
        },
        unique: {
            name: 'unique_menu_path',
            msg: 'Menu path already exists'
        }
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Order is required'
            },
            isInt: {
                msg: 'Order must be an integer'
            }
        },
        unique: {
            name: 'unique_menu_order',
            msg: 'Order value already exists'
        }
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
    tableName: 'menus',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['name']
        },
        {
            unique: true,
            fields: ['path']
        },
        {
            unique: true,
            fields: ['order']
        }
    ]
});

module.exports = Menu;