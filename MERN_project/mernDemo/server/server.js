require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
//connect to database
connectDB();

const app = express();
const router = require("./router/auth-router");

//json middleware for use json data
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World my name is Sazid");
});
app.get("/register", (req, res) => {
  res.status(200).send("Hello World this is register page");
});

app.use("/api/auth", router);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
