const mongoose = require("mongoose");

const GameSettings = new mongoose.Schema({
  gameName: {
    type: String,
    required: true,
    unique: true,
  },
  winProbability: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
});

module.exports = mongoose.model("GameSettings", GameSettings);
