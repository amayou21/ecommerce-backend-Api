const express = require("express");
const {
  getCategories,
  getSpesificCategory,
  createCategories,
  updateSpesificCategory,
  deleteSpesificCategory,
} = require("../services/ctegoryService");

const {
  getSpesificCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utility/validators/categoryValidator");

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(createCategoryValidator, createCategories);
router
  .route("/:id")
  .get(getSpesificCategoryValidator, getSpesificCategory)
  .put(updateCategoryValidator, updateSpesificCategory)
  .delete(deleteCategoryValidator, deleteSpesificCategory);

module.exports = router;
