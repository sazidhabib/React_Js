const express = require("express");
const router = express.Router();
//const {home, register} = require("../controllers/auth-controller");
const authcontrollers = require("../controllers/auth-controller");

// app.get("/",(req, res)=>{
//     res.status(200).send("Hello World my name is Sazid");
// })
// app.get("/register",(req, res)=>{
//     res.status(200).send("Hello World this is register page");
// })

// router.get("/",(req, res)=>{
//     res.status(200).send("Hello World my name is Sazid this from router.");
// });

//home route
router.route("/").get(authcontrollers.home);

router.route("/register").post(authcontrollers.register);

module.exports = router;
