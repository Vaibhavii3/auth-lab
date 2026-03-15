const express = require("express");
const router = express.Router();
const { register, login, getBasicProtected } = require("../controllers/authController");
const basicAuth = require("../middlewares/basicAuth");

router.post("/register", register);
router.post("/login", login);
router.get("/protected", basicAuth, getBasicProtected);

module.exports = router;