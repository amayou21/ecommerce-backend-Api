const { check, body } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");
const { default: slugify } = require("slugify");

// @desc    errors validator outside express for create category middleware
exports.createCategoryValidator = [
  // @desc  1-rules
  check("name")
    .notEmpty()
    .withMessage("category name required")
    .isLength({ max: 32 })
    .withMessage("too long category name")
    .isLength({ min: 3 })
    .withMessage("too short category name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  // @desc  2- catch errors if the rules not exist
  ValidatoreMiddleware,
];

exports.getSpesificCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category Id format"),
  ValidatoreMiddleware,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category Id format"),

  check("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  ValidatoreMiddleware,
];
exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category Id format"),
  ValidatoreMiddleware,
];
