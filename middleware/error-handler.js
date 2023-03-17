const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something Unexpected Happended!",
  };

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.PARTIAL_CONTENT;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate Value Entered for ${Object.keys(err.keyValue)
      .toString()
      .toUpperCase()} Field`;
    customError.statusCode = StatusCodes.NOT_ACCEPTABLE;
  }

  if (err.name === "CastError") {
    customError.msg = `No Item Found with ID: ${err.value}`;
    customError.statusCode = 404;
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
