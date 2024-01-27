const { check, body } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");
const { default: slugify } = require("slugify");
const { BrandModel } = require("../../models/BrandModel")
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

    // check brand name value
    .custom(val => {
      if (!isNaN(val) || !isNaN(parseFloat(val)))
        throw new Error(`brand name must be a string`)
      return true
    })

    // check if this brand alredy exist
    .custom(async (value) => {
      const existingCategory = await BrandModel.findOne({ name: value });
      if (existingCategory) {
        throw new Error("This brand already exists");
      }
      return true;
    })
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
    .custom(val => {
      if (!isNaN(val) || !isNaN(parseFloat(val)))
        throw new Error(`brand name must be a string ${val}`)
      return true
    })
    .custom(async (value) => {
      const existingCategory = await brandModel.findOne({ name: value });
      if (existingCategory) {
        throw new Error("This brand already exists");
      }
      return true;
    })
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
