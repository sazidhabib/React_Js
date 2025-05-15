const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');
const photoController = require('../controllers/photoController');
const upload = require('../middlewares/multer-config');
const authMiddleware = require('../middlewares/auth-middleware');


// Album CRUD (Admin only)
router.post('/albums', authMiddleware, albumController.createAlbum);
router.patch('/albums/:id', authMiddleware, albumController.updateAlbum);
router.delete('/albums/:id', authMiddleware, albumController.deleteAlbum);

// Album GET - no auth required
router.get('/albums', albumController.getAllAlbums);

// Photo CRUD (Admin only)
router.post('/photos', authMiddleware, upload.single('image'), photoController.uploadPhoto);
router.patch('/photos/:id', authMiddleware, upload.single('image'), photoController.updatePhoto);
router.delete('/photos/:id', authMiddleware, photoController.deletePhoto);

// Photo GET - no auth required
router.get('/photos/:albumId', photoController.getPhotosByAlbum);


module.exports = router;
