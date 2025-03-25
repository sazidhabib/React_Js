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


const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  Credentials: true,
};
//cors middleware for use cross origin
app.use(cors(corsOptions));

//json middleware for use json data
app.use(express.json());

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
