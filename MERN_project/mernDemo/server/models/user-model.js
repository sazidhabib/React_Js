const mongoose = require("mongoose");

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

//create register model 
const User = new mongoose.model("User", userSchema);
module.exports = User;