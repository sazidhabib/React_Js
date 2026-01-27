const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const initDb = require('./config/initDb');

// Initialize Database
initDb();

// CORS Configuration
const corsOptions = {
    origin: [
        'https://photocard.nextideasolution.com',
        'http://localhost:5173' // for local development
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS middleware - This handles preflight automatically
app.use(cors(corsOptions));

// Remove the problematic app.options line entirely
// app.options('/*', cors(corsOptions)); // ← REMOVE or COMMENT OUT THIS LINE

// Other Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test Route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Import Routes
const frameRoutes = require('./routes/frameRoutes');
const userRoutes = require('./routes/userRoutes');
const settingRoutes = require('./routes/settingRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// Use Routes
app.use('/api/frames', frameRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});