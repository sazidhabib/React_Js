const pool = require('../config/db');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Get all frames
exports.getAllFrames = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT f.*, c.name as category_name FROM ph_frames f LEFT JOIN ph_categories c ON f.category_id = c.id ORDER BY f.created_at DESC');
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

// Helper to process image with Sharp
const processImage = async (file) => {
    const { filename, path: inputPath, destination } = file;
    const nameWithoutExt = path.parse(filename).name;
    const outputFilename = `${nameWithoutExt}.webp`;
    const outputPath = path.join(destination, outputFilename);

    await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);

    // Remove original file
    fs.unlinkSync(inputPath);

    return outputFilename;
};

// Create new frame
exports.createFrame = async (req, res) => {
    const { title, category_id, description, is_popular, status } = req.body;

    try {
        let image_url = null;
        if (req.file) {
            const outputFilename = await processImage(req.file);
            const serverUrl = process.env.SERVER_URL || `${req.protocol}://${req.get('host')}`;
            image_url = `${serverUrl}/uploads/frames/${outputFilename}`;
        }

        const [result] = await pool.query(
            'INSERT INTO ph_frames (title, image_url, category_id, description, is_popular, status) VALUES (?, ?, ?, ?, ?, ?)',
            [title, image_url, category_id, description, is_popular === 'true' || is_popular === true, status || 'active']
        );
        res.status(201).json({ id: result.insertId, title, image_url, category_id, description, is_popular, status });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Update frame
exports.updateFrame = async (req, res) => {
    const { title, category_id, description, is_popular, status } = req.body;

    try {
        let image_url = req.body.image_url;
        if (req.file) {
            const outputFilename = await processImage(req.file);
            const serverUrl = process.env.SERVER_URL || `${req.protocol}://${req.get('host')}`;
            image_url = `${serverUrl}/uploads/frames/${outputFilename}`;
        }

        const [result] = await pool.query(
            'UPDATE ph_frames SET title = ?, image_url = ?, category_id = ?, description = ?, is_popular = ?, status = ? WHERE id = ?',
            [title, image_url, category_id, description, is_popular === 'true' || is_popular === true, status, req.params.id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ message: 'Frame not found' });
        res.status(200).json({ message: 'Frame updated successfully', image_url });
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
