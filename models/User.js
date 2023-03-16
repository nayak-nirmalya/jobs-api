const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide a Valid Name!"],
    minlength: 4,
    maxlength: 24,
  },
  email: {
    type: String,
    required: [true, "Please Provide a E-Mail!"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please Provide a Valid E-Mail!",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide a Password!"],
    minlength: 4,
    maxlength: 12,
  },
});

module.exports = mongoose.model("User", UserSchema);
