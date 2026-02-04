const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        password: {
            type: String,
            required: function () {
                return this.authProvider === "local";
            }
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },

        authProvider: {
            type: String,
            enum: ["local", "google", "github"],
            default: "local"
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        refreshToken: {
            type: String
        },

        twoFactorEnabled: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);