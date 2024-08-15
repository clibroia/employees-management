require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use("*", cors()); // To refine further

const port = 3060;

app.use(express.json());

// Route files
const adminRoutes = require("./back-end/routes/adminRoutes");

// Use routes
app.use("/admin", adminRoutes);

// Global error handler
app.use((err, req, res) => {
  if (err.msg.includes("[Validation Error]")) {
    return res.status(400).json({ message: `${err.msg}` });
  }
  res.status(500).send("Internal Server Error");
});

// Entry point
app.get("/", (req, res) => {
  res.send("Inside the server");
});

// Setting up the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
