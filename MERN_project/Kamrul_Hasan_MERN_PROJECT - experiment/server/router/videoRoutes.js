const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const createVideoValidator = require('../validators/videoValidator');
const validate = require('../middlewares/validate-middleware');
const { upload, convertToWebp } = require("../middlewares/multer-config");
const authMiddleware = require('../middlewares/auth-middleware');

console.log("videoController.createVideo:", typeof videoController.createVideo);
console.log("createVideoValidator:", typeof createVideoValidator);
console.log("validate:", typeof validate);
console.log("upload.single:", typeof upload.single);
console.log("convertToWebp:", typeof convertToWebp);
console.log("authMiddleware:", typeof authMiddleware);

router
    .route('/')
    .get(videoController.getVideos)
    .post(upload.single('thumbnail'), convertToWebp, authMiddleware, ...createVideoValidator, validate, videoController.createVideo);

router
    .route('/:id')
    .get(videoController.getVideo)
    .patch(upload.single('thumbnail'), convertToWebp, authMiddleware, videoController.updateVideo)
    .delete(authMiddleware, videoController.deleteVideo);

module.exports = router;