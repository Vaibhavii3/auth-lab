const express = require("express");
const router = express.Router();
const { send, verify } = require("../controllers/magicLinkController");

router.post("/send", send);
router.get("/verify", verify);

module.exports = router;
