const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, username, email, role, created_at FROM ph_users');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin Login
exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM ph_users WHERE email = ? AND role = "admin"', [email]);
        if (rows.length === 0) return res.status(401).json({ message: 'Invalid credentials or not an admin' });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        res.status(200).json({ token, user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new user (admin can add)
exports.createUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO ph_users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, role || 'user']
        );
        res.status(201).json({ id: result.insertId, username, email, role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM ph_users WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
