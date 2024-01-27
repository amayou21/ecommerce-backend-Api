const { check, body } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");
const { default: slugify } = require("slugify");
const { CategoryModel } = require("../../models/CategoryModels");

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
    })
    // check if the name value
    .custom(val => {
      if (!isNaN(val) || !isNaN(parseFloat(val)))
        throw new Error(`category name must be a string`)
      return true
    })
    .custom(async (value) => {
      const existingCategory = await CategoryModel.findOne({ name: value });
      if (existingCategory) {
        throw new Error("This category already exists");
      }
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
    })
    .custom(val => {
      if (!isNaN(val) || !isNaN(parseFloat(val)))
        throw new Error(`category name must be a string`)
      return true
    })
    .custom(async (value) => {
      const existingCategory = await CategoryModel.findOne({ name: value });
      if (existingCategory) {
        throw new Error("This category already exists");
      }
      return true;
    }),
  ValidatoreMiddleware,
];
exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category Id format"),
  ValidatoreMiddleware,
];
