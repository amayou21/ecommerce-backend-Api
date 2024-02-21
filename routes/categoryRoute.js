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
const { protect, allowTo } = require("../services/authService");

const router = express.Router();

router.use("/:categoryId/subcategories", subCategoryRoute);

router
  .route("/")
  .get(getCategories)
  .post(protect, allowTo("admin", "manager"), uploadImage, resizeImage, createCategoryValidator, createCategories);
router
  .route("/:id")
  .get(getSpesificCategoryValidator, getSpesificCategory)
  .put(
    protect, allowTo("admin", "manager"),
    uploadImage,
    resizeImage,
    updateCategoryValidator,
    updateSpesificCategory
  )
  .delete(protect, allowTo("admin"), deleteCategoryValidator, deleteSpesificCategory);

module.exports = router;
