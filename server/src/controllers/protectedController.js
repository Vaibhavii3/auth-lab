exports.getDashboard = (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user
  });
};

exports.getAdminDashboard = (req, res) => {
  res.json({
    message: "Welcome Admin",
    user: req.user
  });
};

exports.getProfile = (req, res) => {
  res.json({
    message: "User profile",
    user: req.user
  });
};
