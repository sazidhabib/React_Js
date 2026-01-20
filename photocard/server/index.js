const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Import Routes
const frameRoutes = require('./routes/frameRoutes');
const userRoutes = require('./routes/userRoutes');
const settingRoutes = require('./routes/settingRoutes');

// Use Routes
app.use('/api/frames', frameRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
