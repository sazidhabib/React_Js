const User = require("../models/user-model");
const bcrypt = require("bcryptjs");


//Home logic

const home = async (req, res) => {
  try {
    res
      .status(200)
      .send("Hello World my name is Sazid this is from auth controller.");
  } catch (error) {
    console.log(error);
  }
};

//register logic
const register = async (req, res) => {
  try {
    //console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "User already exist" });
    }

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);


    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });
    //jwt jason web token 
    res.status(200).json({ msg: "user Created.", 
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString() });
  } catch (error) {
    //res.status(500).json("Internal server error");
    next(error);
  }
};


//user login logic
const login = async (req, res) =>{
  try{
    const{email, password} = req.body;

    const userExist = await User.findOne({email});

    if(!userExist){
      return res.status(400).json({msg: "Invalid credentials"});
    }

    //const isPasswordValid = await bcrypt.compare(password, userExist.password);
    const isPasswordValid = await userExist.comparePassword(password);

    if(isPasswordValid){
      return res.status(200).json({msg: "Login success", 
        token: await userExist.generateToken(), 
        userId: userExist._id.toString()});
    } else {
      
      return res.status(400).json({msg: "Invalid email or password"});
    }

    
  }catch (error) {
    res.status(500).json("Internal server error");
  }
}

module.exports = { home, register, login };
