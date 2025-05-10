const Song = require('../models/song');

// CREATE
exports.createSong = async (req, res) => {
    try {
        const { title, youtubeUrl, position } = req.body;

        const existing = await Song.findOne({ title });
        if (existing) {
            return res.status(400).json({ message: 'Duplicate title not allowed' });
        }

        const newSong = new Song({ title, youtubeUrl, position });
        await newSong.save();
        res.status(201).json(newSong);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// READ (sorted by position)
exports.getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find().sort({ position: 1 });
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

        const song = await Song.findById(id);
        if (!song) return res.status(404).json({ message: 'Song not found' });

        if (title && title !== song.title) {
            const duplicate = await Song.findOne({ title });
            if (duplicate) return res.status(400).json({ message: 'Duplicate title not allowed' });
        }

        song.title = title || song.title;
        song.youtubeUrl = youtubeUrl || song.youtubeUrl;
        song.position = position !== undefined ? position : song.position;

        await song.save();
        res.json(song);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE
exports.deleteSong = async (req, res) => {
    try {
        const { id } = req.params;
        const song = await Song.findByIdAndDelete(id);
        if (!song) return res.status(404).json({ message: 'Song not found' });
        res.json({ message: 'Song deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
