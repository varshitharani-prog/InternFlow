const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  phone: String,
  college: String,
  cgpa: String,
  skills: String,
  goal: String,

  resume: String,
  cgpaSheet: String
});

module.exports = mongoose.model("User", userSchema);