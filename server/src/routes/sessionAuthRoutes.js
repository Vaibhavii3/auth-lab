const express = require("express");
const router = express.Router();
const { login, logout, getProtected } = require("../controllers/sessionAuthController");
const { isAuthenticated } = require("../middlewares/sessionAuth");

router.post("/login", login);
router.post("/logout", logout);
router.get("/protected", isAuthenticated, getProtected);

module.exports = router;