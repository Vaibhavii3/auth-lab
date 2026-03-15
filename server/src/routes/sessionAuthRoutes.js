const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/sessionAuthController");
const { isAuthenticated } = require("../middlewares/sessionAuth");
const User = require("../models/User");

router.post("/login", login);
router.post("/logout", logout);

router.get("/protected", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Session invalid" });
    }
    res.json({
      message: "Session valid",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;