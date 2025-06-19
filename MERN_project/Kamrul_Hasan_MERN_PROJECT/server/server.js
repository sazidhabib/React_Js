require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");
const fs = require("fs");
const connectDB = require("./db/connect");
const errorMiddleware = require("./middlewares/error-middleware");
const songRoutes = require('./router/songsRoutes');
const photoRoutes = require('./router/photoRoutes');
const menuRoutes = require('./router/menu-routes');
const heroSectionRoutes = require('./router/heroSectionRoutes');
const sectionRoutes = require('./router/sectionRoutes');

connectDB();
const app = express();

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

// Routers
app.use("/api/auth", require("./router/auth-router"));
app.use("/api/articles", require("./router/article-router"));
app.use("/api/blogs", require("./router/blog-router"));
app.use('/api/songs', songRoutes);
app.use('/api', photoRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/hero-section', heroSectionRoutes);
app.use('/api/sections', sectionRoutes);

// Test Routes
app.get("/", (req, res) => {
  res.status(200).send("Database is connected successfully");
});
app.get("/register", (req, res) => {
  res.status(200).send("Hello World this is register page");
});

// Error middleware
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
