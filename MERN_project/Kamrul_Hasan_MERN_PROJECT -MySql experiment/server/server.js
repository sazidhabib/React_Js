require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");
const fs = require("fs");
const sequelize = require('./db/database');
const Article = require("./models/article-model");
const errorMiddleware = require("./middlewares/error-middleware");

// Create Express app FIRST
const app = express();



// ✅ Sync database
sequelize.sync({ alter: true })
  .then(() => console.log("✅ MySQL tables created or updated"))
  .catch(err => console.error("❌ Error syncing DB:", err));
// Ensure "uploads" folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS config
const corsOptions = {
  origin: ["http://localhost:5173", "https://kamrulhasan.info"],
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

// JSON middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.originalUrl}`);
  next();
});

// Import routes
const songRoutes = require('./router/songsRoutes');
const photoRoutes = require('./router/photoRoutes');
const menuRoutes = require('./router/menu-routes');
const heroSectionRoutes = require('./router/heroSectionRoutes');
const sectionRoutes = require('./router/sectionRoutes');
const videos = require('./router/videoRoutes');

// Routers
app.use("/api/auth", require("./router/auth-router"));
app.use("/api/articles", require("./router/article-router"));
app.use("/api/blogs", require("./router/blog-router"));
app.use('/api/songs', songRoutes);
app.use('/api', photoRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/hero-section', heroSectionRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/v1/videos', videos);

// Test Routes
app.get("/", (req, res) => {
  res.status(200).send("Database is connected successfully");
});
app.get("/register", (req, res) => {
  res.status(200).send("Hello World this is register page");
});

// Error middleware
app.use(errorMiddleware);

// Connect to database and start server
const startServer = async () => {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('MySQL connection established successfully.');

    // Import models
    require('./models/user-model');

    // Sync models
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};

startServer();