const pool = require('../config/db');

// Get settings (only one row exists)
exports.getSettings = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ph_settings WHERE id = 1');
        if (rows.length === 0) return res.status(404).json({ message: 'Settings not found' });
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update settings
exports.updateSettings = async (req, res) => {
    const { site_title, support_email, helpline_number, footer_text } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE ph_settings SET site_title = ?, support_email = ?, helpline_number = ?, footer_text = ? WHERE id = 1',
            [site_title, support_email, helpline_number, footer_text]
        );
        res.status(200).json({ message: 'Settings updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
