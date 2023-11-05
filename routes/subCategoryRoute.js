const express = require("express");
const {
  createSubCategory,
  getSubCategories,
  getSpesificSubCategory,
  updateSpesificSubCategory,
  deleteSpesificSubCategory,
} = require("../services/SubCategoryService");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSpesificSubCategoryValidator,
  getSpesificSubCategoryValidator,
  deleteSpesificSubCategoryValidator,
} = require("../utility/validators/subCategoryValidator");
const router = express.Router();

router
  .route("/")
  .get(getSubCategoryValidator, getSubCategories)
  .post(createSubCategoryValidator, createSubCategory);
router
  .route("/:id")
  .get(getSpesificSubCategoryValidator, getSpesificSubCategory)
  .put(updateSpesificSubCategoryValidator, updateSpesificSubCategory)
  .delete(deleteSpesificSubCategoryValidator,deleteSpesificSubCategory);

module.exports = router;
