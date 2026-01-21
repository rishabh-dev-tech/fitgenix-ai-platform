const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    goal: {
      type: String,
      enum: ["fat-loss", "muscle-building", "strength", "wellness"],
      required: true
    },

    description: {
      type: String
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner"
    },

    durationWeeks: {
      type: Number,
      default: 4
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Program", programSchema);