const express = require("express");
const { protect } = require("../middlewares/jwtAuth");
const { getDashboard } = require("../controllers/protectedController");

const router = express.Router();

router.get("/dashboard", protect, getDashboard);

module.exports = router;