const pool = require('../config/db');

// Get all frames
exports.getAllFrames = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ph_frames ORDER BY created_at DESC');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single frame
exports.getFrameById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ph_frames WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Frame not found' });
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new frame
exports.createFrame = async (req, res) => {
    const { title, image_url, category, description, is_popular } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO ph_frames (title, image_url, category, description, is_popular) VALUES (?, ?, ?, ?, ?)',
            [title, image_url, category, description, is_popular || false]
        );
        res.status(201).json({ id: result.insertId, title, image_url, category, description, is_popular });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update frame
exports.updateFrame = async (req, res) => {
    const { title, image_url, category, description, is_popular } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE ph_frames SET title = ?, image_url = ?, category = ?, description = ?, is_popular = ? WHERE id = ?',
            [title, image_url, category, description, is_popular, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Frame not found' });
        res.status(200).json({ message: 'Frame updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete frame
exports.deleteFrame = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM ph_frames WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Frame not found' });
        res.status(200).json({ message: 'Frame deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
