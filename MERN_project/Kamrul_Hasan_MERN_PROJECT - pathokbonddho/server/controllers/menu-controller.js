const Menu = require('../models/menu-model');
const { Op } = require('sequelize');

// Helper function to build menu tree
const buildMenuTree = (menus, parentId = null) => {
    return menus
        .filter(menu => menu.parentId === parentId)
        .map(menu => ({
            ...menu.toJSON(),
            children: buildMenuTree(menus, menu.id)
        }))
        .sort((a, b) => a.order - b.order);
};

// Protected Admin Routes
const createMenu = async (req, res) => {
    try {
        const { name, path, order, metaTitle, metaDescription, metaKeywords, parentId, level = 0, isActive = true } = req.body;

        // Validate input
        if (!name || !path || order === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Name, path, and order are required'
            });
        }

        // Validate parent exists if parentId is provided
        if (parentId) {
            const parentMenu = await Menu.findByPk(parentId);
            if (!parentMenu) {
                return res.status(400).json({
                    success: false,
                    message: 'Parent menu not found'
                });
            }
        }

        const menu = await Menu.create({
            name,
            path,
            order,
            metaTitle,
            metaDescription,
            metaKeywords,
            parentId,
            level,
            isActive
        });

        // Include parent information in response
        const menuWithParent = await Menu.findByPk(menu.id, {
            include: [{
                model: Menu,
                as: 'parent',
                attributes: ['id', 'name']
            }]
        });

        res.status(201).json({
            success: true,
            data: menuWithParent
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

// Public Routes
const getMenus = async (req, res) => {
    try {
        const { format = 'flat', activeOnly = 'false' } = req.query;

        const whereClause = {};
        if (activeOnly === 'true') {
            whereClause.isActive = true;
        }

        const menus = await Menu.findAll({
            where: whereClause,
            include: [{
                model: Menu,
                as: 'parent',
                attributes: ['id', 'name']
            }],
            order: [['level', 'ASC'], ['order', 'ASC']]
        });

        let responseData;
        if (format === 'tree') {
            responseData = buildMenuTree(menus);
        } else {
            responseData = menus;
        }

        res.status(200).json({
            success: true,
            data: responseData,
            format: format
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};

// Get menu by ID with children
const getMenuById = async (req, res) => {
    try {
        const { id } = req.params;

        const menu = await Menu.findByPk(id, {
            include: [
                {
                    model: Menu,
                    as: 'parent',
                    attributes: ['id', 'name']
                },
                {
                    model: Menu,
                    as: 'children',
                    include: [{
                        model: Menu,
                        as: 'children'
                    }],
                    order: [['order', 'ASC']]
                }
            ]
        });

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: 'Menu not found'
            });
        }

        res.status(200).json({
            success: true,
            data: menu
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};

// Get only parent menus (for dropdowns)
const getParentMenus = async (req, res) => {
    try {
        const parentMenus = await Menu.findAll({
            where: {
                parentId: null,
                isActive: true
            },
            attributes: ['id', 'name', 'level'],
            order: [['level', 'ASC'], ['order', 'ASC']]
        });

        res.status(200).json({
            success: true,
            data: parentMenus
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
        const { name, path, order, metaTitle, metaDescription, metaKeywords, parentId, level, isActive } = req.body;
        const { id } = req.params;

        const menu = await Menu.findByPk(id);

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: 'Menu not found'
            });
        }

        // Prevent circular reference
        if (parentId && parentId == id) {
            return res.status(400).json({
                success: false,
                message: 'Menu cannot be its own parent'
            });
        }

        // Validate parent exists if parentId is provided
        if (parentId) {
            const parentMenu = await Menu.findByPk(parentId);
            if (!parentMenu) {
                return res.status(400).json({
                    success: false,
                    message: 'Parent menu not found'
                });
            }
        }

        // Update menu
        await menu.update({
            name,
            path,
            order,
            metaTitle,
            metaDescription,
            metaKeywords,
            parentId,
            level,
            isActive
        });

        // Fetch updated menu with relations
        const updatedMenu = await Menu.findByPk(id, {
            include: [{
                model: Menu,
                as: 'parent',
                attributes: ['id', 'name']
            }]
        });

        res.status(200).json({
            success: true,
            data: updatedMenu
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

        // Check if menu has children
        const childCount = await Menu.count({
            where: { parentId: id }
        });

        if (childCount > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete menu with sub-menus. Please delete sub-menus first.'
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

// Bulk update menu order and hierarchy
const updateMenuOrder = async (req, res) => {
    try {
        const { menus } = req.body; // Array of { id, order, parentId, level }

        if (!Array.isArray(menus)) {
            return res.status(400).json({
                success: false,
                message: 'Menus array is required'
            });
        }

        const updatePromises = menus.map(menu =>
            Menu.update(
                {
                    order: menu.order,
                    parentId: menu.parentId,
                    level: menu.level
                },
                { where: { id: menu.id } }
            )
        );

        await Promise.all(updatePromises);

        res.status(200).json({
            success: true,
            message: 'Menu order updated successfully'
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
    getMenuById,
    getParentMenus,
    updateMenu,
    deleteMenu,
    updateMenuOrder
};