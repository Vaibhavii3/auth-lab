const User = require("../models/User");
const ApiKey = require("../models/ApiKey");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password required" });
    }

    let user = await User.findOne({ email });
    if (user) {
      const existingKey = await ApiKey.findOne({ userId: user._id });
      if (existingKey) {
        return res.status(400).json({
          message: "You already have an API key. Use the login flow or request a new key from dashboard."
        });
      }
    } else {
      user = await User.create({ name, email, password });
    }

    const rawKey = await ApiKey.createForUser(user._id, "Demo key");

    res.status(201).json({
      message: "API key created. Store it securely – it won't be shown again.",
      apiKey: rawKey,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Registration failed" });
  }
};

exports.getProtected = (req, res) => {
  res.json({
    message: "API key authentication successful",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    }
  });
};
