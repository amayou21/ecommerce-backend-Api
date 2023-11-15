const express = require("express");

const {
  getCategories,
  getSpesificCategory,
  createCategories,
  updateSpesificCategory,
  deleteSpesificCategory,
  uploadImage,
  resizeImage,
} = require("../services/ctegoryService");

const {
  getSpesificCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utility/validators/categoryValidator");

const subCategoryRoute = require("../routes/subCategoryRoute");

const router = express.Router();

router.use("/:categoryId/subcategories", subCategoryRoute);

router
  .route("/")
  .get(getCategories)
  .post(uploadImage, resizeImage, createCategoryValidator, createCategories);
router
  .route("/:id")
  .get(getSpesificCategoryValidator, getSpesificCategory)
  .put(
    uploadImage,
    resizeImage,
    updateCategoryValidator,
    updateSpesificCategory
  )
  .delete(deleteCategoryValidator, deleteSpesificCategory);

module.exports = router;
