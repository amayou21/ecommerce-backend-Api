const { check } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");
const { CategoryModel } = require("../../models/CategoryModels");
const { default: slugify } = require("slugify");
const SUbCategoryModele = require("../../models/SUbCategoryModele");

exports.createSubCategoryValidator = [

  // check name
  check("name")
    .notEmpty()
    .withMessage("subCategory name is required")
    .isLength({ max: 32 })
    .withMessage("Too long subCategory name")
    .isLength({ min: 2 })
    .withMessage("Too short category name")

    // check if the name value
    .custom(val => {
      if (!isNaN(val) || !isNaN(parseFloat(val)))
        throw new Error(`sub category name must be a string`)
      return true
    })

    // check if the sub category alredy exists
    .custom(async (value) => {
      const existingCategory = await SUbCategoryModele.findOne({ name: value });
      if (existingCategory) {
        throw new Error("This sub category already exists");
      }
      return true;
    })

    // create slug
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("category")
    .isMongoId()
    .withMessage("inccorrect category id! ")
    .notEmpty()
    .withMessage("category is required")

    // check if there's category with this ID
    .custom(async (categoryID) => {
      const category = await CategoryModel.findById(categoryID);
      if (!category) throw new Error("no category with this id");
      return true;
    }),
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
    .withMessage("Too short sub category name")

    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    })

    .custom(val => {
      if (!isNaN(val) || !isNaN(parseFloat(val)))
        throw new Error(`sub category name must be a string ${val}`)
      return true
    })

    .custom(async (value) => {
      const existingCategory = await SUbCategoryModele.findOne({ name: value });
      if (existingCategory) {
        throw new Error("This sub category already exists");
      }
      return true;
    }),

  check("category")
    .optional()
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
