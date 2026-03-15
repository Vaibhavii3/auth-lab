const User = require("../models/User");

/**
 * Basic Auth middleware: Authorization: Basic <base64(email:password)>
 * Uses email as the "username" to match User model.
 */
const basicAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return res.status(401).json({ message: "Missing credentials", error: "Missing credentials" });
    }

    const base64Credentials = authHeader.split(" ")[1];
    const decoded = Buffer.from(base64Credentials, "base64").toString("utf8");
    const [email, password] = decoded.split(":");

    if (!email || !password) {
      return res.status(401).json({ message: "Invalid credentials", error: "Invalid credentials" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials", error: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials", error: "Invalid credentials" });
    }

    req.user = { id: user._id, name: user.name, email: user.email };
    next();
  } catch (err) {
    res.status(500).json({ message: err.message, error: "Authentication failed" });
  }
};

module.exports = basicAuth;
