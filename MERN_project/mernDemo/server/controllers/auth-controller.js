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
    console.log("Received data:", req.body); // ✅ Log incoming request data

    const { username, email, phone, password, isAdmin } = req.body;

    console.log("Parsed isAdmin:", isAdmin); // ✅ Check if it is received correctly

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Ensure isAdmin is correctly parsed as a Boolean
    const isAdminValue = isAdmin === true || isAdmin === "true"; // ✅ Converts "true" (string) to true

    console.log("Final isAdmin value:", isAdminValue); // ✅ Verify before saving to DB

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
      isAdmin: isAdminValue, // ✅ Use the corrected value
    });

    res.status(200).json({
      msg: "User Created.",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
      isAdmin: userCreated.isAdmin, // ✅ Return isAdmin to confirm
    });

  } catch (error) {
    //res.status(500).json("Internal server error");
    next(error);
  }
};


//user login logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isPasswordValid = await userExist.comparePassword(password);

    if (isPasswordValid) {
      return res.status(200).json({
        msg: "Login success",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
        isAdmin: userExist.isAdmin,  // ✅ Include isAdmin in response
      });
    } else {
      return res.status(400).json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};


module.exports = { home, register, login };
