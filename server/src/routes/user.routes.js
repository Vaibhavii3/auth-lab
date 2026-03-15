const express = require("express");
const { protect } = require("../middlewares/jwtAuth");
const { getProfile } = require("../controllers/protectedController");

const router = express.Router();

router.get("/profile", protect, getProfile);

module.exports = router;