const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  process.env.NODE_ENV === "developement"
    ? sendErrorForDev(err, res)
    : sendErrorForProd(err, res);
  // res.status(err.statusCode).json({
  //   tatus: err.status,
  //   message: err.message,
  //   error: err,
  //   stack: err.stack,
  // });
};

const sendErrorForDev = (err, res) => {
  return res.status(err.statusCode).json({
    tatus: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorForProd = (err, res) => {
  return res.status(err.statusCode).json({
    tatus: err.status,
    message: err.message,
  });
};
module.exports = globalError;
