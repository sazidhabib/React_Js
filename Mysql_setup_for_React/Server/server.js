require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

// Initialize Express app
const app = express();

// Database connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "http://localhost:5000"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"]
        }
    },
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['Content-Length']
}));

// Body parser middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// File upload setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'));
    }
});

// Upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded or invalid file type' });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({
        imageUrl,
        message: 'File uploaded successfully'
    });
});

// Serve static files with proper headers
app.use('/uploads', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Cross-Origin-Resource-Policy', 'cross-origin');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    next();
}, express.static(path.join(__dirname, 'uploads')));

// Image proxy endpoint
app.get('/api/proxy-image', async (req, res) => {
    try {
        const imageUrl = req.query.url;
        if (!imageUrl) {
            return res.status(400).json({ error: 'Image URL is required' });
        }

        const response = await axios.get(imageUrl, {
            responseType: 'stream',
            headers: {
                'Accept': 'image/*',
                'User-Agent': 'BlogApp/1.0'
            }
        });

        res.setHeader('Content-Type', response.headers['content-type']);
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

        response.data.pipe(res);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({
            error: 'Error loading image',
            details: error.message
        });
    }
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({
        status: 'API is working',
        uploadsPath: path.join(__dirname, 'uploads'),
        corsConfig: {
            origin: ['http://localhost:3000', 'http://localhost:5173'],
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        }
    });
});

// CRUD Endpoints

// Get all posts
app.get('/api/posts', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');

        const postsWithAbsoluteUrls = rows.map(post => ({
            ...post,
            image_url: post.image_url ?
                (post.image_url.startsWith('http') ? post.image_url : `${req.protocol}://${req.get('host')}${post.image_url}`)
                : null
        }));

        res.json(postsWithAbsoluteUrls);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Database error',
            details: err.message
        });
    }
});

// Create a post
app.post('/api/posts', async (req, res) => {
    const { title, content, imageUrl } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const createdAt = new Date();
    const updatedAt = createdAt;

    try {
        await pool.query(
            'INSERT INTO blog_posts (id, title, content, image_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
            [id, title, content, imageUrl, createdAt, updatedAt]
        );

        res.status(201).json({
            id,
            title,
            content,
            imageUrl: imageUrl || null,
            createdAt,
            updatedAt
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Database error',
            details: err.message
        });
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
        res.status(500).json({
            error: 'Database error',
            details: err.message
        });
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
        res.status(500).json({
            error: 'Database error',
            details: err.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            error: 'File upload error',
            details: err.message
        });
    }

    res.status(500).json({
        error: 'Something went wrong!',
        details: process.env.NODE_ENV === 'development' ? err.message : null
    });
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Connected to MySQL database at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    console.log(`Uploads directory: ${path.join(__dirname, 'uploads')}`);
    console.log(`CORS allowed origins: http://localhost:3000, http://localhost:5173`);
});