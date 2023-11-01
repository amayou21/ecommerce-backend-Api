const express = require("express");
const {
  getCategories,
  getSpesificCategory,
  createCategories,
  updateSpesificCategory,
  deleteSpesificCategory,
} = require("../services/ctegoryService");

const router = express.Router();

router.route("/").get(getCategories).post(createCategories);
router
  .route("/:id")
  .get(getSpesificCategory)
  .put(updateSpesificCategory)
  .delete(deleteSpesificCategory);

module.exports = router;
