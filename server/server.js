require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Database
const connectDB = require("./Backend Configuration/Configuration Folders/DB Configuration/dbConfig");

// Middleware
const {
  notFound,
  errorHandler,
} = require("./Backend Configuration/Configuration Folders/Middleware Configuration/errorMiddleware");

// Routes
const loginRoute = require("./Backend Configuration/Routes/Registration & Login Route/Login/loginRoute");
const registerRoute = require("./Backend Configuration/Routes/Registration & Login Route/Register/register");
const tokenRoute = require("./Backend Configuration/Routes/Token and Session Route/tokenRoute");

// Connect Database
connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth/login", loginRoute);
app.use("/api/auth/register", registerRoute);
// pp.use("/api/auth", tokenRoute);

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running 🚀",
  });
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});