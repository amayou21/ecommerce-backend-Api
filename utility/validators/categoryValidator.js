const { check } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");

exports.categoryValidator = [
  // @desc  1-rules
  check("name")
    .notEmpty()
    .withMessage("category name required")
    .isLength({ max: 32 })
    .withMessage("too long category name")
    .isLength({ min: 3 })
    .withMessage("too short category name"),
  // @desc  2- catch errors if the rules not exist
  ValidatoreMiddleware,
];

exports.getSpesificCategoryValidator = [
  check("id").isMongoId().withMessage("invalid Id"),
  ValidatoreMiddleware,
];
