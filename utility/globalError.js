const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    tatus: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
module.exports = globalError;
