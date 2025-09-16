const Menu = require('../models/menu-model');

// Protected Admin Routes
const createMenu = async (req, res) => {
    try {
        const { name, path, order } = req.body;

        // Validate input
        if (!name || !path || order === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Name, path, and order are required'
            });
        }

        const menu = await Menu.create({ name, path, order });

        res.status(201).json({
            success: true,
            data: menu
        });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            const field = err.errors[0].path;
            return res.status(400).json({
                success: false,
                message: `Menu with this ${field} already exists`
            });
        }

        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                message: err.errors[0].message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};

// Public Route
const getMenus = async (req, res) => {
    try {
        const menus = await Menu.findAll({
            order: [['order', 'ASC']]
        });

        res.status(200).json({
            success: true,
            data: menus
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};

// Protected Admin Routes
const updateMenu = async (req, res) => {
    try {
        const { name, path, order } = req.body;
        const { id } = req.params;

        const menu = await Menu.findByPk(id);

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: 'Menu not found'
            });
        }

        // Update menu
        await menu.update({ name, path, order });

        res.status(200).json({
            success: true,
            data: menu
        });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            const field = err.errors[0].path;
            return res.status(400).json({
                success: false,
                message: `Menu with this ${field} already exists`
            });
        }

        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                message: err.errors[0].message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};

const deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await Menu.findByPk(id);

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: 'Menu not found'
            });
        }

        await menu.destroy();

        res.status(200).json({
            success: true,
            message: 'Menu deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};

module.exports = {
    createMenu,
    getMenus,
    updateMenu,
    deleteMenu
};