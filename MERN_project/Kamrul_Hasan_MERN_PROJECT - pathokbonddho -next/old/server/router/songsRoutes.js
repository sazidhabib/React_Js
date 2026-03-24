const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const validate = require('../middlewares/validate-middleware');
const authMiddleware = require('../middlewares/auth-middleware');
const songSchema = require('../validators/song-validator'); // Correct import

// Routes
router.post('/', authMiddleware, validate(songSchema), songController.createSong);
router.patch('/:id', authMiddleware, validate(songSchema), songController.updateSong);
router.delete('/:id', authMiddleware, songController.deleteSong);

// GET route can remain public or be protected as needed
router.get('/', songController.getAllSongs);

module.exports = router;