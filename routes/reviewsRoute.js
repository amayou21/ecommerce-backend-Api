const express = require("express");
// const {
//   createBrandValidator,
//   getSpesificBrandValidator,
//   updateBrandValidator,
//   deleteBrandValidator,
// } = require("../utility/validators/brandValidator");


const {
  getReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
  setProductID,
  createFilterObj,
  setProductIDAndUserIdToBody,

} = require("../services/reviewService");
const { protect, allowTo } = require("../services/authService");
const { createReviewValidator, getReviewValidator, updateReviewValidator, deleteReviewValidator } = require("../utility/validators/reviewValidator");



const router = express.Router({ mergeParams: true });

router.route("/")
  .get(createFilterObj, getReviews)
  .post(protect, allowTo("user"), setProductIDAndUserIdToBody, createReviewValidator, createReview);

router
  .route("/:id")

  .get(getReviewValidator, getReview)

  .put(protect, allowTo("user"), updateReviewValidator, updateReview)

  .delete(protect, allowTo("user", "manager", "admin"), deleteReviewValidator, deleteReview);

module.exports = router;
