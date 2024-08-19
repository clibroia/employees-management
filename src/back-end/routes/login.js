require("dotenv").config();
const express = require("express");
const { validationResult, matchedData } = require("express-validator");
const jwt = require("jsonwebtoken");
const {
  credentialsValidation,
} = require("../validation/credentialsValidation");

const loginRouter = express.Router();

loginRouter.post("/", credentialsValidation, (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors.array({ onlyFirstError: true })[0]);
  }

  // Sanitized inputs
  const data = matchedData(req);

  switch (data.role) {
    case "ADMIN":
      if (data.email) {
        if (
          data.email === `${process.env.ADMIN_EMAIL}` &&
          data.password === `${process.env.ADMIN_PASSWORD}`
        ) {
          const payload = {
            email: data.email,
            password: data.password,
          };
          const authToken = jwt.sign(payload, `${process.env.JWT_SECRET}`);
          return res
            .status(200)
            .json({ authToken, message: "Admin logged in" });
        }
        return res.status(401).json({ message: "Invalid credentials" });
      }
      if (data.phone) {
        if (
          data.phone === `${process.env.ADMIN_PHONE}` &&
          data.password === `${process.env.ADMIN_PASSWORD}`
        ) {
          const payload = {
            email: data.email,
            password: data.password,
          };
          const authToken = jwt.sign(payload, `${process.env.JWT_SECRET}`);
          return res
            .status(200)
            .json({ authToken, message: "Admin logged in" });
        }
        return res.status(401).json({ message: "Invalid credentials" });
      }
      break;
    case "EMPLOYEE":
      return res.status(100).json({ message: "Stub" });
    default:
      return next(new Error("Internal Server Error"));
  }
});

module.exports = loginRouter;
