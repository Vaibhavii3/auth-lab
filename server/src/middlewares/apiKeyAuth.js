const ApiKey = require("../models/ApiKey");

const apiKeyAuth = async (req, res, next) => {
  try {
    const key = req.headers["x-api-key"] || req.headers["authorization"]?.replace(/^ApiKey\s+/i, "");

    if (!key) {
      return res.status(401).json({ message: "Missing API key", error: "Missing API key" });
    }

    const apiKeyDoc = await ApiKey.findByRawKey(key);
    if (!apiKeyDoc) {
      return res.status(401).json({ message: "Invalid API key", error: "Invalid API key" });
    }

    apiKeyDoc.lastUsedAt = new Date();
    await apiKeyDoc.save({ validateBeforeSave: false });

    req.user = apiKeyDoc.userId;
    req.apiKey = apiKeyDoc;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message || "Authentication failed" });
  }
};

module.exports = apiKeyAuth;
