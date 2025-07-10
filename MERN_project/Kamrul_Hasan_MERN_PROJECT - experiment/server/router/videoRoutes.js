const express = require('express');
const router = express.Router();
const {
    getVideos,
    getVideo,
    createVideo,
    updateVideo,
    deleteVideo
} = require('../controllers/videoController');
const { protect } = require('../middlewares/auth-middleware');
const { createVideoValidator } = require('../Validators/videoValidator');
const { validate } = require('../middlewares/validate-middleware');
const { upload, convertToWebp } = require("../middlewares/multer-config");
const authMiddleware = require('../middlewares/auth-middleware');

router
    .route('/')
    .get(getVideos)
    .post(protect, upload.single('thumbnail'), convertToWebp, authMiddleware, createVideoValidator, validate, createVideo);

router
    .route('/:id')
    .get(getVideo)
    .patch(protect, upload.single('thumbnail'), convertToWebp, authMiddleware, updateVideo)
    .delete(protect, authMiddleware, deleteVideo);

module.exports = router;