

// app.get("/",(req, res)=>{
//     res.status(200).send("Hello World my name is Sazid");
// })
// app.get("/register",(req, res)=>{
//     res.status(200).send("Hello World this is register page");
// })

const express = require("express");
const router = express.Router();

// router.get("/",(req, res)=>{
//     res.status(200).send("Hello World my name is Sazid this from router.");
// });

router.route("/").get((req, res)=>{
    res.status(200).send("Hello World my name is Sazid this from router.");
});

router.route("/register").get((req, res)=>{
    res.status(200).send("Hello World this is register page.");
});

module.exports = router;