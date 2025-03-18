const express = require("express");
const app = express();
const router = require("./router/auth-router");



app.get("/",(req, res)=>{
    res.status(200).send("Hello World my name is Sazid");
})
app.get("/register",(req, res)=>{
    res.status(200).send("Hello World this is register page");
})

app.use("/api/auth", router);

const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});