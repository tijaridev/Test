const mongoose = require("mongoose");

// Skema untuk data live
const liveSchema = new mongoose.Schema({
  viewers: {
    type: Number,
    default: 0,
  },
  title: String,
  welcomeMessage: String,
  notice: String,
  videoDeviceId: String,
  audioDeviceId: String,
  cover: String,
  country: String,
  userId: {
    // Hubungan dengan user
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referensi ke model User
    required: true,
  },
});

const Live = mongoose.model("Live", liveSchema);

module.exports = Live;
