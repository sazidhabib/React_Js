const express = require('express');
const {
    createMenu,
    getMenus,
    updateMenu,
    deleteMenu
} = require('../controllers/menu-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = express.Router();

// Public
router.get('/', getMenus);

// Protected Admin Routes
router.post('/', authMiddleware, createMenu);
router.patch('/:id', authMiddleware, updateMenu);
router.put('/:id', authMiddleware, updateMenu); // Added PUT for better REST compliance
router.delete('/:id', authMiddleware, deleteMenu);

module.exports = router;