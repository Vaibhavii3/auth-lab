const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.userId = user._id;
    req.session.role = user.role;

    res.status(200).json({
      message: "Session login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("authlab.sid");
    res.json({ message: "Logged out successfully" });
  });
};