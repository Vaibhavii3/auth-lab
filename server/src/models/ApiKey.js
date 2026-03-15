const mongoose = require("mongoose");
const crypto = require("crypto");

const apiKeySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, default: "Default" },
    keyHash: { type: String, required: true, unique: true },
    keyPrefix: { type: String, required: true }, // first 8 chars for display
    lastUsedAt: { type: Date }
  },
  { timestamps: true }
);

apiKeySchema.index({ keyHash: 1 });

function hashKey(key) {
  return crypto.createHash("sha256").update(key).digest("hex");
}

function generateKey() {
  const prefix = "sk-lab-";
  const random = crypto.randomBytes(24).toString("hex");
  return prefix + random;
}

apiKeySchema.statics.createForUser = async function (userId, name = "Demo key") {
  const rawKey = generateKey();
  const keyHash = hashKey(rawKey);
  const keyPrefix = rawKey.substring(0, 12);
  await this.create({ userId, name, keyHash, keyPrefix });
  return rawKey;
};

apiKeySchema.statics.findByRawKey = async function (rawKey) {
  const keyHash = hashKey(rawKey);
  return this.findOne({ keyHash }).populate("userId", "name email");
};

module.exports = mongoose.model("ApiKey", apiKeySchema);
module.exports.hashKey = hashKey;
