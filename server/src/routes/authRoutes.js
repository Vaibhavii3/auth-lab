const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const basicAuth = require("../middlewares/basicAuth");

router.post("/register", register);
router.post("/login", login);

// Basic Auth protected route (for demo: send Authorization: Basic <base64(email:password)>)
router.get("/protected", basicAuth, (req, res) => {
  res.json({
    message: "Basic Auth successful",
    user: req.user
  });
});

module.exports = router;