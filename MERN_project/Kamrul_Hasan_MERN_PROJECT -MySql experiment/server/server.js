const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const sequelize = require("./db/database");
const errorMiddleware = require("./middlewares/error-middleware");

const app = express();

// Ensure "uploads" folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS
const corsOptions = {
  origin: ["http://localhost:5173", "https://kamrulhasan.info"],
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", require("./router/auth-router"));
app.use("/api/articles", require("./router/article-router"));
app.use("/api/blogs", require("./router/blog-router"));
app.use("/api/songs", require("./router/songsRoutes"));
app.use("/api", require("./router/photoRoutes"));
app.use("/api/menus", require("./router/menu-routes"));
app.use("/api/hero-section", require("./router/heroSectionRoutes"));
app.use("/api/sections", require("./router/sectionRoutes"));
app.use("/api/v1/videos", require("./router/videoRoutes"));

app.get("/", (req, res) => res.send("Database is connected successfully"));
app.get("/register", (req, res) => res.send("Hello World this is register page"));

app.use(errorMiddleware);

// Start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection established successfully.");

    require("./models/user-model"); // load models


    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
