const express = require("express");
const {
  createSubCategory,
  getSubCategories,
  getSpesificSubCategory,
  updateSpesificSubCategory,
  deleteSpesificSubCategory,
  setCategoryID,
  createFilterObj,
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
const { protect, allowTo } = require("../services/authService");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObj, getSubCategories)
  .post(
    // protect, allowTo("admin", "manager"),
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
    // protect, allowTo("admin", "manager"),
    // uploadImage,
    // resizeImage,
    updateSpesificSubCategoryValidator,
    updateSpesificSubCategory
  )
  .delete(protect, allowTo("admin"), deleteSpesificSubCategoryValidator, deleteSpesificSubCategory);

module.exports = router;
