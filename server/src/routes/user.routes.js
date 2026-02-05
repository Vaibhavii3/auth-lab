const express = require("express");
const { protect } = require("../middlewares/jwtAuth");

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "User profile",
    user: req.user
  });
});

module.exports = router;