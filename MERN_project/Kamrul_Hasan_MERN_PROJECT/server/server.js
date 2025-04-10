require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./db/connect");


//connect to database
connectDB();

const app = express();
const router = require("./router/auth-router");
const e = require("express");
const errorMiddleware = require("./middlewares/error-middleware");
const path = require("path");

// Add this before your routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//article router
const articleRouter = require("./router/article-router");
//blog router
const blogRouter = require("./router/blog-router");


const corsOptions = {
  origin: ["http://localhost:5173", "https://kamrulhasanbd.net"], // ✅ Allow both local and deployed frontend
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
//cors middleware for use cross origin
app.use(cors(corsOptions));

//json middleware for use json data
app.use(express.json());


//article router middleware at the below json middleware
app.use("/api/articles", articleRouter);

//server image & blog route at the below json middleware
app.use("/uploads", express.static("uploads")); // Serve images
app.use("/api/blogs", blogRouter);

// //if upload folder not found then create a new folder
// const fs = require("fs");
// const path = require("path");
// // Ensure "uploads" folder exists
// const uploadDir = path.join(__dirname, "uploads");

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

app.get("/", (req, res) => {
  res.status(200).send("Hello World my name is Sazid");
});
app.get("/register", (req, res) => {
  res.status(200).send("Hello World this is register page");
});

//router middleware
app.use("/api/auth", router);

//error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
