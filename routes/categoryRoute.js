const express = require("express");
const {
  getCategories,
  getSpesificCategory,
  createCategories,
  updateSpesificCategory,
  deleteSpesificCategory,
} = require("../services/ctegoryService");

const {
  categoryValidator,
  getSpesificCategoryValidator,
} = require("../utility/validators/categoryValidator");

const router = express.Router();

router.route("/").get(getCategories).post(categoryValidator, createCategories);
router
  .route("/:id")
  .get(getSpesificCategoryValidator, getSpesificCategory)
  .put(updateSpesificCategory)
  .delete(deleteSpesificCategory);

module.exports = router;
