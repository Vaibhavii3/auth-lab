const express = require("express");
const { protect } = require("../middlewares/jwtAuth");
const authorizeRoles = require("../middlewares/roleAuth");
const { getAdminDashboard } = require("../controllers/protectedController");

const router = express.Router();

router.get("/dashboard", protect, authorizeRoles("admin"), getAdminDashboard);

module.exports = router;