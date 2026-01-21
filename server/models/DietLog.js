const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fats: { type: Number, default: 0 }
  },
  { _id: false }
);

const dietLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    meals: [mealSchema],

    totalCalories: {
      type: Number,
      default: 0
    },

    protein: {
      type: Number,
      default: 0
    },

    carbs: {
      type: Number,
      default: 0
    },

    fats: {
      type: Number,
      default: 0
    },

    water: {
      type: Number,
      default: 0 // liters
    },

    notes: String,

    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DietLog", dietLogSchema);