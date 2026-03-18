require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI);

async function createAdmin() {

  const existing = await Admin.findOne({ username: "admin" });

  if (existing) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashed = await bcrypt.hash("admin123", 10);

  await Admin.create({
    username: "admin",
    password: hashed
  });

  console.log("Admin created successfully!");
  process.exit();
}

createAdmin();