const express = require('express');
const {
    createMenu,
    getMenus,
    getMenuById,
    getParentMenus,
    updateMenu,
    deleteMenu,
    updateMenuOrder
} = require('../controllers/menu-controller');
const authMiddleware = require('../middlewares/auth-middleware');


const router = express.Router();

// Public Routes
router.get('/', getMenus);
router.get('/parents', getParentMenus);
router.get('/:id', getMenuById);

// Protected Admin Routes
router.post('/', authMiddleware, createMenu);
router.patch('/:id', authMiddleware, updateMenu);
router.put('/:id', authMiddleware, updateMenu);
router.put('/:id', authMiddleware, updateMenu);
router.delete('/:id', authMiddleware, deleteMenu);
router.post('/update-order', authMiddleware, updateMenuOrder);

module.exports = router;