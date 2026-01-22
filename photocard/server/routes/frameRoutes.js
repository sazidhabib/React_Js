const express = require('express');
const router = express.Router();
const frameController = require('../controllers/frameController');

const { verifyToken, authorize } = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

router.get('/', frameController.getAllFrames);
router.get('/:id', frameController.getFrameById);
router.post('/', verifyToken, authorize('admin'), upload.single('image'), frameController.createFrame);
router.put('/:id', verifyToken, authorize('admin'), upload.single('image'), frameController.updateFrame);
router.delete('/:id', verifyToken, authorize('admin'), frameController.deleteFrame);

module.exports = router;
