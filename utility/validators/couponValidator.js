const { check, body } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");
const couponModel = require("../../models/couponModel");

exports.createCouponValidator = [
  check("name")
    .notEmpty()
    .withMessage("coupon name is required")
    .isLength({ max: 20 }).withMessage("Too long coupon name")
    .isLength({ min: 1 }).withMessage("Too shoort coupon name")

    // check if the name value is a string
    .custom(val => {
      if (!isNaN(val) || !isNaN(parseFloat(val)))
        throw new Error(`coupon name must be a string`)
      return true
    })

    // check if this coupon alredy exist
    .custom(async (value) => {
      const coupon = await couponModel.findOne({ name: value });
      if (coupon) {
        throw new Error("This coupon already exists");
      }
      return true;
    }),
  check("expire")
    .notEmpty()
    .withMessage("coupon expired time is required")
    .isDate()
    .withMessage("expired coupon time must be a date "),
  check("discount")
    .notEmpty()
    .withMessage("coupon discount is required")
    .isNumeric()
    .withMessage("coupon discount must be a namber"),
  ValidatoreMiddleware,
];

exports.getCouponValidator = [
  check("id").isMongoId().withMessage("invalid coupon Id format"),
  ValidatoreMiddleware,
];

exports.updateCouponValidator = [
  check("id").isMongoId().withMessage("invalid coupon Id format"),

  check("name")
    .optional()
    // .withMessage("coupon name is required")
    .isLength({ max: 20 }).withMessage("Too long coupon name")
    .isLength({ min: 1 }).withMessage("Too shoort coupon name")

    // check if the name value is a string
    .custom(val => {
      if (!isNaN(val) || !isNaN(parseFloat(val)))
        throw new Error(`coupon name must be a string`)
      return true
    })

    // check if this coupon alredy exist
    .custom(async (value) => {
      const coupon = await couponModel.findOne({ name: value });
      if (coupon) {
        throw new Error("This coupon already exists");
      }
      return true;
    }),

  check("expire")
    .optional()
    .isDate()
    .withMessage("expired coupon time must be a date "),

  check("discount")
    .optional()
    .isNumeric()
    .withMessage("coupon discount must be a namber"),

  ValidatoreMiddleware,
];

exports.deleteCouponValidator = [
  check("id").isMongoId().withMessage("invalid coupon Id format"),
  ValidatoreMiddleware,
];
