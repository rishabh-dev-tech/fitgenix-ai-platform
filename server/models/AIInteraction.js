const mongoose = require("mongoose");

const aiInteractionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    question: {
      type: String,
      required: true
    },

    response: {
      type: String,
      required: true
    },

    context: {
      type: String // fitness / diet / progress / motivation
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AIInteraction", aiInteractionSchema);