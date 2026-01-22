const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const initDb = require('./config/initDb');

// Initialize Database
initDb();


// Middleware
app.use(cors());
app.use(express.json());
app.get('/uploads', express.static('uploads'));
app.use('/uploads', express.static(require('path').join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));

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
