// @desc   this class is responsible bout operation errors (errors that can I predict)
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    this.isOperation = true;
  }
}

module.exports = ApiError;
