require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const connectDB = require("./db/connect");

//json middleware for use json data
app.use(express.json());

app.get("/",(req, res)=>{
    res.status(200).send("Hello World my name is Sazid");
})
app.get("/register",(req, res)=>{
    res.status(200).send("Hello World this is register page");
})

app.use("/api/auth", router);

const PORT = 5000;

//connect to database
connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    });
    console.log("Database is connected");
}).catch((error)=>{
    console.log(error);
});
