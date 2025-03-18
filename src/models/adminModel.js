const mongoose = require("mongoose");

// Skema untuk Admin
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "superadmin"],
    default: "admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Buat model Admin berdasarkan skema
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
