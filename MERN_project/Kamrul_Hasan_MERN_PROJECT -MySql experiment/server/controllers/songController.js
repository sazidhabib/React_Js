const Song = require('../models/song');
const { Op } = require('sequelize');

// CREATE
exports.createSong = async (req, res) => {
    try {
        const { title, youtubeUrl, position } = req.body;
        console.log('Received data:', req.body); // Debug log

        // Check for duplicate title
        const existing = await Song.findOne({ where: { title } });
        if (existing) {
            return res.status(400).json({ message: 'Duplicate title not allowed' });
        }

        const newSong = await Song.create({
            title,
            youtubeUrl,
            position: position || 9999
        });


        console.log('Song created successfully:', newSong.toJSON()); // Debug log
        res.status(201).json(newSong);
    } catch (err) {
        console.error('Error creating song:', err); // Detailed error log
        res.status(500).json({
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
        });
    }
};

// READ (sorted by position)
exports.getAllSongs = async (req, res) => {
    try {
        const songs = await Song.findAll({
            order: [['position', 'ASC']]
        });
        res.json(songs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE
exports.updateSong = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, youtubeUrl, position } = req.body;

        const song = await Song.findByPk(id);
        if (!song) return res.status(404).json({ message: 'Song not found' });

        if (title && title !== song.title) {
            const duplicate = await Song.findOne({
                where: {
                    title,
                    id: { [Op.ne]: id } // exclude current song
                }
            });
            if (duplicate) return res.status(409).json({ message: 'Duplicate title not allowed' });
        }

        // Update the song
        await song.update({
            title: title || song.title,
            youtubeUrl: youtubeUrl || song.youtubeUrl,
            position: position !== undefined ? position : song.position
        });

        res.json(song);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE
exports.deleteSong = async (req, res) => {
    try {
        const { id } = req.params;
        const song = await Song.findByPk(id);

        if (!song) return res.status(404).json({ message: 'Song not found' });

        await song.destroy();
        res.json({ message: 'Song deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};