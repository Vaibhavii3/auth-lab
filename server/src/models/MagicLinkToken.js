const mongoose = require("mongoose");
const crypto = require("crypto");

const magicLinkTokenSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

magicLinkTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL for auto-delete (optional)

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

magicLinkTokenSchema.statics.createForEmail = async function (email, expiresInMinutes = 15) {
  const rawToken = generateToken();
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
  await this.create({ email, tokenHash, expiresAt });
  return rawToken;
};

magicLinkTokenSchema.statics.findByRawToken = async function (rawToken) {
  const tokenHash = hashToken(rawToken);
  return this.findOne({ tokenHash });
};

module.exports = mongoose.model("MagicLinkToken", magicLinkTokenSchema);
module.exports.hashToken = hashToken;
