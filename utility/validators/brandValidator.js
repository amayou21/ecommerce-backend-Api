const { check } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");

// @desc    errors validator outside express for create category middleware
exports.createBrandValidator = [
  // @desc  1-rules
  check("name")
    .notEmpty()
    .withMessage("Brand name required")
    .isLength({ max: 32 })
    .withMessage("too long Brand name")
    .isLength({ min: 3 })
    .withMessage("too short Brand name"),
  // @desc  2- catch errors if the rules not exist
  ValidatoreMiddleware,
];

exports.getSpesificBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand Id format"),
  ValidatoreMiddleware,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand Id format"),
  ValidatoreMiddleware,
];
exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand Id format"),
  ValidatoreMiddleware,
];
