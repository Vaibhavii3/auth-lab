const MagicLinkToken = require("../models/MagicLinkToken");
const User = require("../models/User");

const FRONTEND_BASE = process.env.FRONTEND_URL || "http://localhost:5173";
const TOKEN_EXPIRY_MINUTES = 15;

exports.send = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Valid email required" });
    }

    const rawToken = await MagicLinkToken.createForEmail(email, TOKEN_EXPIRY_MINUTES);
    const link = `${FRONTEND_BASE}/demo/magic-link?token=${rawToken}`;

    res.status(200).json({
      message: "Magic link created. Use it within 15 minutes. (Demo: no email sent – copy link below.)",
      link,
      expiresIn: TOKEN_EXPIRY_MINUTES
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to create magic link" });
  }
};

exports.verify = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: "Token required" });
    }

    const tokenDoc = await MagicLinkToken.findByRawToken(token);
    if (!tokenDoc) {
      return res.status(401).json({ message: "Invalid or expired link" });
    }

    if (new Date() > tokenDoc.expiresAt) {
      await MagicLinkToken.deleteOne({ _id: tokenDoc._id });
      return res.status(401).json({ message: "Link expired" });
    }

    let user = await User.findOne({ email: tokenDoc.email });
    if (!user) {
      const name = tokenDoc.email.split("@")[0];
      user = await User.create({
        name,
        email: tokenDoc.email,
        authProvider: "magic_link"
      });
    }

    req.session.userId = user._id;
    req.session.role = user.role;

    await MagicLinkToken.deleteOne({ _id: tokenDoc._id });

    res.status(200).json({
      success: true,
      message: "Logged in with magic link",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Verification failed" });
  }
};
