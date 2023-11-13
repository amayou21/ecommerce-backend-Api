const { check, body } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");
const { default: slugify } = require("slugify");

// @desc    errors validator outside express for create category middleware
exports.createBrandValidator = [
  // @desc  1-rules
  check("name")
    .notEmpty()
    .withMessage("Brand name required")
    .isLength({ max: 32 })
    .withMessage("too long Brand name")
    .isLength({ min: 3 })
    .withMessage("too short Brand name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  // @desc  2- catch errors if the rules not exist
  ValidatoreMiddleware,
];

exports.getSpesificBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand Id format"),
  ValidatoreMiddleware,
];

exports.updateBrandValidator = [
  check("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("id").isMongoId().withMessage("invalid Brand Id format"),
  ValidatoreMiddleware,
];
exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand Id format"),
  ValidatoreMiddleware,
];
