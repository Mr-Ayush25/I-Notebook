const mongoose = require("mongoose");
const { Schema } = mongoose;
const { model } = mongoose;
// Define Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Exporting a model as a Schema
module.exports = model("user", UserSchema);
