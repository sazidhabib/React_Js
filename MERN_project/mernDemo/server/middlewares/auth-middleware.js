const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Access Denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
