const express = require("express");
const {
  createSubCategory,
  getSubCategories,
  getSpesificSubCategory,
} = require("../services/SubCategoryService");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
} = require("../utility/validators/subCategoryValidator");
const router = express.Router();

router
  .route("/")
  .get(getSubCategoryValidator, getSubCategories)
  .post(createSubCategoryValidator, createSubCategory);
router
  .route("/:id")
  .get(getSpesificSubCategory)
  .post((req, res) => {
    res.send("10");
  });

module.exports = router;
