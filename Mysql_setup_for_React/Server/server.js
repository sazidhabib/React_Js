const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'saziddb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// CRUD Endpoints

// Get all posts
app.get('/api/posts', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Create a post
app.post('/api/posts', async (req, res) => {
    const { title, content, imageUrl } = req.body;
    const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const createdAt = new Date();
    const updatedAt = createdAt;

    try {
        await pool.query(
            'INSERT INTO blog_posts (id, title, content, image_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
            [id, title, content, imageUrl, createdAt, updatedAt]
        );
        res.status(201).json({ id, title, content, imageUrl, createdAt, updatedAt });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Update a post
app.put('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, imageUrl } = req.body;
    const updatedAt = new Date();

    try {
        const [result] = await pool.query(
            'UPDATE blog_posts SET title = ?, content = ?, image_url = ?, updated_at = ? WHERE id = ?',
            [title, content, imageUrl, updatedAt, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json({ id, title, content, imageUrl, updatedAt });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Delete a post
app.delete('/api/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM blog_posts WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});