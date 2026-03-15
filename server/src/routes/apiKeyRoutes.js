const express = require("express");
const router = express.Router();
const { register, getProtected } = require("../controllers/apiKeyController");
const apiKeyAuth = require("../middlewares/apiKeyAuth");

router.post("/register", register);
router.get("/protected", apiKeyAuth, getProtected);

module.exports = router;
