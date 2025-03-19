const mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/myDatabase"

const URI = process.env.MONGODB_URI;
const connectDB = async ()=>{
    try {
        await mongoose.connect(URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database is connected");
    }
    catch (error) {
        console.error("database connection failed");
        process.exit(0);
    }
    
};

module.exports = connectDB;