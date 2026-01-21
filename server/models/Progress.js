const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    weight: {
      type: Number,
      required: true
    },

    bodyFat: {
      type: Number
    },

    chest: Number,
    waist: Number,
    hips: Number,

    strengthLevel: {
      type: Number
    },

    notes: {
      type: String
    },

    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Progress", progressSchema);