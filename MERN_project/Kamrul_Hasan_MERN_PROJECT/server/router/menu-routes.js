const express = require('express');
const {
    createMenu,
    getMenus,
    updateMenu,
    deleteMenu
} = require('../controllers/menu-controller.js');
const authMiddleware = require('../middlewares/auth-middleware.js');

const router = express.Router();

// Public
router.get('/', getMenus);

// Protected Admin Routes
router.post('/', authMiddleware, createMenu);
router.patch('/:id', authMiddleware, updateMenu);
router.delete('/:id', authMiddleware, deleteMenu);

module.exports = router;