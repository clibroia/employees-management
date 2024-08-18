require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Extract token
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  // Verify token
  try {
    jwt.verify(token, `${process.env.JWT_SECRET}`);
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = authenticateToken;
