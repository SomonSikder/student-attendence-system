const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
const connectDb = require("./db");

const port = process.env.PORT || 4000;
// Imports
const allRoutes = require("./routes/index");
// const error = require("./utils/error");

// Middleware
app.use(allRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  const message = err.message ? err.message : "Server error occured";
  const status = err.status ? err.status : 500;
  res.status(status).json(message);
});
// MongoDb Connection

connectDb("mongodb://localhost:27017/attendance-db").then(() => {
  console.log("Database connected");
  // Create Server
  app.listen(port, () => {
    console.log(`server is running on Port ${port}`);
  });
});
