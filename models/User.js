const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
    // select: false,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

UserSchema.methods.comparePassword = async function (logInPassword) {
  return await bcrypt.compare(logInPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
