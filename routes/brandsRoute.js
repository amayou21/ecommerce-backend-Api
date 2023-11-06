const express = require("express");
const {
  getSpesificBrand,
  createBrand,
  getBrands,
  updateSpesificBrand,
  deleteSpesificBrand,
} = require("../services/brandService");
const {
  createBrandValidator,
  getSpesificBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utility/validators/brandValidator");

const router = express.Router();

router.route("/").get(getBrands).post(createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getSpesificBrandValidator, getSpesificBrand)
  .put(updateBrandValidator, updateSpesificBrand)
  .delete(deleteBrandValidator, deleteSpesificBrand);

module.exports = router;
