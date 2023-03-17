const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please Provide E-Mail & Password!");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("E-Mail Does Not Exists!");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Wrong Credential!");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
