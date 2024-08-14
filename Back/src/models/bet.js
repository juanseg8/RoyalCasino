const mongoose = require("mongoose");

const BetSchema = new mongoose.Schema({
  game: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  choice: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  win: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bet", BetSchema);
