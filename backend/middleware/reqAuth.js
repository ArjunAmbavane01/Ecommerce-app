const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error("Authorization token is required");

    const decodedToken = jwt.verify(token.split(" ")[1], process.env.SECRET);
    if (!decodedToken._id) throw new Error("Invalid token data");

    const user = await User.findById(decodedToken._id);
    if (!user) throw new Error("User not found");

    req.id = decodedToken._id;
    next();

  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: "Request is not authorized: " + error.message, success: false });
  }
};

module.exports = requireAuth;
