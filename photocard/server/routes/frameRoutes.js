const express = require('express');
const router = express.Router();
const frameController = require('../controllers/frameController');

const { verifyToken, authorize } = require('../middleware/authMiddleware');

router.get('/', frameController.getAllFrames);
router.get('/:id', frameController.getFrameById);
router.post('/', verifyToken, authorize('admin'), frameController.createFrame);
router.put('/:id', verifyToken, authorize('admin'), frameController.updateFrame);
router.delete('/:id', verifyToken, authorize('admin'), frameController.deleteFrame);

module.exports = router;
