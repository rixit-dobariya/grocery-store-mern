const AppError = require("../utils/AppError");

const errorMiddleware = (err, req, res, next) => {
  // Default fallback values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.isOperational) {
    // Known, handled error
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Unknown or programming error
    console.error("💥 UNEXPECTED ERROR:", err);

    res.status(500).json({
      status: "error",
      message: "Something went wrong on the server",
    });
  }
};

module.exports = errorMiddleware;
