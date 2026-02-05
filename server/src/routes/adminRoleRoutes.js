const express = require("express");
const { protect } = require("../middlewares/jwtAuth");
const authorizeRoles = require("../middlewares/roleAuth");

const router = express.Router();

router.get(
    "/dashboard",
    protect,
    authorizeRoles("admin"),
    (req, res) => {
        res.json({
            message: "Welcome Admin",
            user: req.user
        });
    }
);

module.exports = router;