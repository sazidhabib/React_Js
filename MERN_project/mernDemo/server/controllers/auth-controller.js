const User = require('../models/user-model');


//Home logic

const home = async (req, res) => {
    try {
        res.status(200).send("Hello World my name is Sazid this is from auth controller.");
    } catch (error) {     
        console.log(error);
    }
}

//register logic
const register = async(req, res) => {
    try {
        //console.log(req.body);
        const {username, email, phone, password} = req.body;

        const userExist = User.findOne({email: email});

        if(userExist){
            return res.status(400).json({msg: "User already exist"});
        }
        await User.create({
            username,
            email,
            phone,
            password,
        });

        res.status(200).json({data });
    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

module.exports = {home, register};