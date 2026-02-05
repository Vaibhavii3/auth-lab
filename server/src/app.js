require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sessionConfig = require("./config/session");
const authRoutes = require("./routes/authRoutes")
const sessionAuthRoutes = require("./routes/sessionAuthRoutes");
const jwtRoutes = require("./routes/jwtRoutes");
const protectedRoutes = require("./routes/protected.routes");
const adminRoutes = require("./routes/adminRoleRoutes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(sessionConfig);

app.use("/api/auth", authRoutes);
app.use("/api/session", sessionAuthRoutes);
app.use("/api/jwt", jwtRoutes);
app.use("/api", protectedRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Auth Lab API running");
});

module.exports = app;