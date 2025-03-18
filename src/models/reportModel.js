const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  reportBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userReport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  capture: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
