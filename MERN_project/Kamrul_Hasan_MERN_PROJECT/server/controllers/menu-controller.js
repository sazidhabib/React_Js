import Menu from '../models/menu-model.js';


// Protected Admin Routes
export const createMenu = async (req, res) => {
    try {
        const { name, path, order } = req.body;

        // Validate input
        if (!name || !path || order === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Name, path, and order are required'
            });
        }

        const menu = new Menu({ name, path, order });
        await menu.save();

        res.status(201).json({
            success: true,
            data: menu
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Menu with this name, path, or order already exists'
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
export const getMenus = async (req, res) => {
    try {
        const menus = await Menu.find().sort({ order: 1 });
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
export const updateMenu = async (req, res) => {
    try {
        const { name, path, order } = req.body;
        const menu = await Menu.findByIdAndUpdate(
            req.params.id,
            { name, path, order },
            { new: true, runValidators: true }
        );

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
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Menu with this name, path, or order already exists'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};

export const deleteMenu = async (req, res) => {
    try {
        const menu = await Menu.findByIdAndDelete(req.params.id);
        if (!menu) {
            return res.status(404).json({
                success: false,
                message: 'Menu not found'
            });
        }
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