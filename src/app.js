require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use("*", cors()); // To refine further

const port = `${process.env.SERVER_PORT}`;

app.use(express.json());

// Route files
const adminRoutes = require("./back-end/routes/adminRoutes");
const loginRoute = require("./back-end/routes/login");

// Use routes
app.use("/admin", adminRoutes);
app.use("/login", loginRoute);

// Global error handler
/* eslint-disable-next-line no-unused-vars */
app.use((err, req, res, next) => {
  // Input validation error
  if (err.msg && err.msg.includes("[VALIDATION ERROR]")) {
    return res.status(400).json({ message: `${err.msg}` });
  }

  // Authentication error
  const errorNames = [
    "TokenExpiredError",
    "JsonWebTokenError",
    "NotBeforeError",
  ];
  if (errorNames.includes(err.name)) {
    return res
      .status(401)
      .json({ message: `[Authentication error] ${err.name}` });
  }

  // Resource conflict
  if (err.msg && err.msg.includes("[RESOURCE CONFLICT]")) {
    return res.status(409).json({ message: `${err.msg}` });
  }
  // Internal Server Error
  return res.status(500).json({ message: "Internal Server Error" });
});
/* eslint-enable-next-line no-unused-vars */

// Entry point
app.get("/", (req, res) => {
  res.send("Inside the server");
});

// Setting up the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
