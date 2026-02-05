const express = require("express");
const { protect } = require("../middlewares/jwtAuth");

const router = express.Router();

router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user
  });
});

module.exports = router;