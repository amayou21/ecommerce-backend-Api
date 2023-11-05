const { check } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("subCategory name is required")
    .isLength({ max: 32 })
    .withMessage("Too long subCategory name")
    .isLength({ min: 2 })
    .withMessage("Too short category name"),
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
