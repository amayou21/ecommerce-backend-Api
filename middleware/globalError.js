const ApiError = require("../utility/apiError");

// @desc  error for developement mode
const sendErrorForDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};


// @desc   error for production mode
const sendErrorForProd = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

// @desc  JsonWebTokenError

const invalidTokenSignature = () => {
  return new ApiError("invalid Token, pleas login again...", 401)
}

//  @desc  token expired

const tokenExpired = () => {
  return new ApiError("expired token,pleas login again...", 401)
}

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "developement") {
    sendErrorForDev(err, res)
  } else {
    if (err.name === "JsonWebTokenError") {
      err = invalidTokenSignature()
    }
    if (err.name === "TokenExpiredError") {
      err = tokenExpired()
    }
    sendErrorForProd(err, res);
  }
};

module.exports = globalError;
