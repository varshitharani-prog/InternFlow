const mongoose = require("mongoose");

async function connectDB() {

  try {

    await mongoose.connect(
      "mongodb://127.0.0.1:27017/internshipDB"
    );

    console.log("MongoDB Connected");

  } catch (error) {

    console.log("DB Error:", error);

  }

}

module.exports = connectDB;