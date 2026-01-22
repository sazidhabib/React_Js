const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, authorize } = require('../middleware/authMiddleware');
// Routes
router.get('/', verifyToken, authorize('admin'), userController.getAllUsers);
router.post('/', verifyToken, authorize('admin'), userController.createUser);
router.put('/:id', verifyToken, authorize('admin'), userController.updateUser); // Add this
router.delete('/:id', verifyToken, authorize('admin'), userController.deleteUser);
router.post('/login', userController.adminLogin);

module.exports = router;
