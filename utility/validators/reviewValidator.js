const { check, body } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");
// const { default: slugify } = require("slugify");
const ReviewModel = require("../../models/reviewModel")

// @desc    errors validator outside express for create category middleware
exports.createReviewValidator = [
  // @desc  1-rules
  check("title")
    .optional(),
  check("retings")
    .notEmpty()
    .withMessage("Ratings value required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Ratings value must be between 1 to 5"),
  check("user")
    .isMongoId("Invalid Review format ID"),
  check("product")
    .isMongoId("Invalid Review format ID")

    // check if the review alredy created on this product by the same user
    .custom(async (val, { req }) => {

      const review = await ReviewModel.findOne(
        { user: req.user._id.toString(), product: req.body.product }
      )
      
      if (req.body.user !== req.user._id.toString()) {
        throw new Error("You can't created a review using other user ID");
      }
      if (review) {
        throw new Error("You already created a review before");
      }
      return true;
    }),

  ValidatoreMiddleware,
];

exports.getReviewValidator = [
  check("id").isMongoId().withMessage("invalid Review Id format"),
  ValidatoreMiddleware,
];

exports.updateReviewValidator = [
  check("retings")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Ratings value must be between 1 to 5"),
  check("id")
    .isMongoId()
    .withMessage("invalid Review Id format")
    .custom(async (val, { req }) => {
      const review = await ReviewModel.findById(val)
      if (!review) {
        throw new Error(`there's no review with this  ID :${val}`);
      }
      if (req.user._id.toString() !== review.user._id.toString()) {
        throw new Error("You are not allowed to perform this action");
      }
      return true;
    }),
  ValidatoreMiddleware,
];

exports.deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("invalid Review Id format")
    .custom(async (val, { req }) => {
      if (req.user.role === "user") {
        const review = await ReviewModel.findById(val)
        if (!review) {
          throw new Error(`there's no review with this  ID :${val}`);
        }
        if (req.user._id.toString() !== review.user._id.toString()) {
          throw new Error("You are not allowed to perform this action");
        }
      }
      return true;
    }),
  ValidatoreMiddleware,
];
