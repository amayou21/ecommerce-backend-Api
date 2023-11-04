
  // @desc catch errors if the rules not exist
const { validationResult } = require("express-validator");

const ValidatoreMiddleware = (req, res, next) => {
  const result = validationResult(req);
  !result.isEmpty() ? res.send({ errors: result.array() }) : next();
};

module.exports = ValidatoreMiddleware;
