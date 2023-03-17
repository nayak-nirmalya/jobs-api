const User = require("../models/User");
const { UnauthenticatedError } = require("../errors");

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw new UnauthenticatedError("Authentication Failed!");

  const token = authHeader.split("")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to job route
    req.user = {
      userId: payload.userId,
      name: payload.name,
    };

    next();
  } catch (error) {
    console.error(error);
    throw new UnauthenticatedError("Authentication Invalid!");
  }
};

module.exports = auth;
