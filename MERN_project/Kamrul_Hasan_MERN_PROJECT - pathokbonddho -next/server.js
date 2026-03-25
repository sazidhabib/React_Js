const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: ".env.local" });
require("dotenv").config(); // fallback to .env if needed

const sequelize = require("./db/database");
const errorMiddleware = require("./middlewares/error-middleware");

const app = express();

// Ensure "uploads" folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/images", express.static(path.join(__dirname, "uploads")));

// CORS
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000", "https://kamrulhasan.info"],
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Import Routers
const tagRoutes = require("./router/tag-router");
const authorRoutes = require('./router/author-router');
const adRouter = require('./router/ad-router');
const designRoutes = require('./router/design-router');
const imageRegistryRoutes = require('./router/imageRegistryRoutes');
const menuRoutes = require('./router/menu-routes');
const newsRouter = require('./router/news-router');

// Routes
app.use("/api/menus", menuRoutes);
app.use("/api/auth", require("./router/auth-router"));
app.use("/api/articles", require("./router/article-router"));
app.use("/api/blogs", require("./router/blog-router"));
app.use("/api/songs", require("./router/songsRoutes"));
app.use("/api/hero-section", require("./router/heroSectionRoutes"));
app.use("/api/sections", require("./router/sectionRoutes"));
app.use("/api/v1/videos", require("./router/videoRoutes"));
app.use("/api/layout", require("./router/layoutRouters"));
app.use('/api/tags', tagRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/ads', adRouter);
app.use('/api/designs', designRoutes);
app.use("/api/news", newsRouter);
app.use("/api/users", require("./router/user-router"));

//wildcard route like /api, / or /*, it might be intercepting the /api/news request & others API routes
app.use("/api", require("./router/photoRoutes"));
app.use("/api/images", require("./router/imageRoutes"));
app.use('/api/image-registry', imageRegistryRoutes);



app.get("/", (req, res) => res.send("Database is connected successfully"));
app.get("/register", (req, res) => res.send("Hello World this is register page"));

// Trigger restart for DB sync

app.use(errorMiddleware);


// Start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection established successfully.");

    // Load ALL models
    const { Page, PageSection, Row, Column, News, Tag, Category, Author, NewsTag, NewsCategory } = require("./models");

    console.log("✅ All models loaded successfully:");
    console.log("   - Page:", !!Page);
    console.log("   - PageSection:", !!PageSection);
    console.log("   - Row:", !!Row);
    console.log("   - Column:", !!Column);

    // Use safe sync instead of direct sync
    if (process.env.NODE_ENV !== 'production') {
      console.log("🔄 Database sync disabled to prevent ER_TOO_MANY_KEYS error.");
      console.log("👉 Please use Migrations for schema changes.");

      // Disabled problematic alter: true which causes duplicate indexes in MySQL
      // await sequelize.sync({ alter: true });
    } else {
      console.log("✅ Production environment: Using migrations only");
    }

    // Verify tables were created
    const [tables] = await sequelize.query("SHOW TABLES");
    const tableNames = tables.map(t => Object.values(t)[0]);
    console.log("✅ Database tables:", tableNames);

    // Check if our layout tables exist
    const layoutTables = ['pages', 'page_sections', 'rows', 'columns'];
    const missingTables = layoutTables.filter(table => !tableNames.includes(table));

    if (missingTables.length > 0) {
      console.log("❌ Missing tables:", missingTables);
      console.log("🔄 Creating missing tables...");
      await sequelize.sync(); // This will only create missing tables
    } else {
      console.log("✅ All layout tables exist!");
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
};

startServer();