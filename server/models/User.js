const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/,
        "Please enter a valid email address"
      ]
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"]
    },

    // ✅ ACTIVE FITNESS PROGRAM
    activeProgram: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      default: null
    },

    // ✅ ROLE SYSTEM (ADMIN PANEL CORE)
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    // ✅ ACCOUNT CONTROL (ADMIN POWER)
    isActive: {
      type: Boolean,
      default: true
    },

    disabledAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);