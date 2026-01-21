const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, authorize } = require('../middleware/authMiddleware');

router.get('/', verifyToken, authorize('admin'), userController.getAllUsers);
router.post('/', userController.createUser); // Admin adds user, but maybe open for registration? Plan said admin adds.
router.delete('/:id', verifyToken, authorize('admin'), userController.deleteUser);
router.post('/login', userController.adminLogin);

module.exports = router;
