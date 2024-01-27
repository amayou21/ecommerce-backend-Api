const express = require("express");
const {
  createSubCategory,
  getSubCategories,
  getSpesificSubCategory,
  updateSpesificSubCategory,
  deleteSpesificSubCategory,
  setCategoryID,
  // uploadImage,
  // resizeImage,
} = require("../services/SubCategoryService");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSpesificSubCategoryValidator,
  getSpesificSubCategoryValidator,
  deleteSpesificSubCategoryValidator,
} = require("../utility/validators/subCategoryValidator");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getSubCategoryValidator, getSubCategories)
  .post(
    // uploadImage,
    // resizeImage,
    setCategoryID,
    createSubCategoryValidator,
    createSubCategory
  );
router
  .route("/:id")
  .get(getSpesificSubCategoryValidator, getSpesificSubCategory)
  .put(
    // uploadImage,
    // resizeImage,
    updateSpesificSubCategoryValidator,
    updateSpesificSubCategory
  )
  .delete(deleteSpesificSubCategoryValidator, deleteSpesificSubCategory);

module.exports = router;
