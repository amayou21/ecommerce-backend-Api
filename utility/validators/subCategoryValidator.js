const { check } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");
const { CategoryModel } = require("../../models/CategoryModels");
const { default: slugify } = require("slugify");
exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("subCategory name is required")
    .isLength({ max: 32 })
    .withMessage("Too long subCategory name")
    .isLength({ min: 2 })
    .withMessage("Too short category name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("category")
    .isMongoId()
    .withMessage("inccorrect category id! ")
    .notEmpty()
    .withMessage("category is required"),
  ValidatoreMiddleware,
];

exports.getSubCategoryValidator = [
  check("page").optional().isNumeric().withMessage("Invalid page number!"),
  check("limit").optional().isNumeric().withMessage("Invalid limit number!"),
  ValidatoreMiddleware,
];

exports.getSpesificSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory Id format"),
  ValidatoreMiddleware,
];

exports.updateSpesificSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory Id format"),
  check("name")
    .optional()
    .isLength({ max: 32 })
    .withMessage("Too long subCategory name")
    .isLength({ min: 2 })
    .withMessage("Too short category name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("category")
    .isMongoId()
    .withMessage("Invalid category Id! ")
    .notEmpty()
    .withMessage("parent category is required")
    .custom(async (categoryID) => {
      const category = await CategoryModel.findById(categoryID);
      if (!category) throw new Error("no category with this id");
    }),
  ValidatoreMiddleware,
];

exports.deleteSpesificSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory Id format"),
  ValidatoreMiddleware,
];
