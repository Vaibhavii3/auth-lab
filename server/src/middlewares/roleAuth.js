/**
 * Restrict route access to given roles.
 * Must be used after protect (JWT) middleware so req.user exists.
 * @param  {...string} roles - Allowed roles (e.g. 'admin', 'user')
 */
const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied. Insufficient role." });
  }
  next();
};

module.exports = authorizeRoles;
