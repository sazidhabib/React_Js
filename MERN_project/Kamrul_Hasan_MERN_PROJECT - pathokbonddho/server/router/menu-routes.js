
const express = require('express');
const router = express.Router();
const {
    createMenu,
    getMenus,
    getMenuById,
    getParentMenus,
    updateMenu,
    deleteMenu,
    updateMenuOrder,
    debugMiddleware
} = require('../controllers/menu-controller');
const authMiddleware = require('../middlewares/auth-middleware');

console.log('📋 Menu routes file loaded');
console.log('getMenus function:', typeof getMenus);

// Public Routes
router.get('/', (req, res, next) => {
    console.log('🟢 Route handler for / called');
    console.log('Calling getMenus function...');
    return getMenus(req, res, next);
});

// Debug middleware for all menu routes
router.use((req, res, next) => {
    console.log('📝 Menu Route Accessed:', {
        method: req.method,
        url: req.url,
        originalUrl: req.originalUrl,
        time: new Date().toISOString()
    });
    next();
});

// Simple test route
router.get('/test', (req, res) => {
    console.log('✅ /api/menus/test route is working!');
    res.json({
        success: true,
        message: 'Menu routes are working',
        timestamp: new Date().toISOString()
    });
});

// Test endpoint with hardcoded response
router.get('/test-structure', (req, res) => {
    console.log('Test structure endpoint called');

    // This should match what getMenus should return
    const testResponse = {
        success: true,
        data: [
            { id: 1, name: 'Test Menu 1', path: '/test1' },
            { id: 2, name: 'Test Menu 2', path: '/test2' }
        ],
        format: 'flat',
        count: 2
    };

    console.log('Sending test response:', testResponse);
    res.json(testResponse);
});

// Public Routes
// router.get('/', getMenus);
router.get('/parents', getParentMenus);
router.get('/:id', getMenuById);

// Protected Admin Routes
router.post('/', authMiddleware, createMenu);
router.patch('/:id', authMiddleware, updateMenu);
router.delete('/:id', authMiddleware, deleteMenu);
router.post('/update-order', authMiddleware, updateMenuOrder);

module.exports = router;