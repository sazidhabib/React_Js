const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const validate = require('../middlewares/validate-middleware');
const videoSchema = require('../validators/videoValidator');
const { upload, convertToWebp } = require('../middlewares/multer-config');
const authMiddleware = require('../middlewares/auth-middleware');

router
    .route('/')
    .get(videoController.getVideos)
    .post(
        authMiddleware, // Keep auth if you want to protect the route
        upload.single('thumbnail'),
        convertToWebp,
        validate(videoSchema),
        videoController.createVideo
    );

router
    .route('/:id')
    .get(videoController.getVideo)
    .patch(authMiddleware, upload.single('thumbnail'), convertToWebp, videoController.updateVideo)
    .delete(authMiddleware, videoController.deleteVideo);

module.exports = router;