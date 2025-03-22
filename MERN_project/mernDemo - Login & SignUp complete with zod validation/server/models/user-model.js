const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const e = require("express");

//create register schema
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
})

//? secure password using bcrypt
userSchema.pre("save",async function(next){
    const user = this;

    if(!user.isModified("password")){
        return next();
    }

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        
    }catch(error){
        next(error);
    }
});

//? compare password
userSchema.methods.comparePassword = async function(password){
    try{
        return bcrypt.compare(password, this.password);
    }catch(error){
        console.log(error);
    }
};


//json web token
userSchema.methods.generateToken = async function(){
    try{
        return jwt.sign({userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        }, process.env.JWT_SECRET_KEY, {expiresIn: "1h"}
    );
    }catch(error){
        console.log(error);
    }
};


//create register model 
const User = new mongoose.model("User", userSchema);
module.exports = User;