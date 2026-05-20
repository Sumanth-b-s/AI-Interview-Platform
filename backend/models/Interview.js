const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema({
  answer: {
    type: String,
  },

  evaluation: {
    type: String,
  },

  confidenceScore: {
    type: Number,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Interview", InterviewSchema);
