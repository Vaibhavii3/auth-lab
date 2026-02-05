require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sessionConfig = require("./config/session");
const authRoutes = require("./routes/authRoutes")
const sessionAuthRoutes = require("./routes/sessionAuthRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(sessionConfig);

app.use("/api/auth", authRoutes);
app.use("/api/session", sessionAuthRoutes)

app.get("/", (req, res) => {
  res.send("Auth Lab API running");
});

module.exports = app;