const express = require("express");
const {
  getSpesificBrand,
  createBrand,
  getBrands,
  updateSpesificBrand,
  deleteSpesificBrand,
  resizeImage,
  uploadImage,
} = require("../services/brandService");
const {
  createBrandValidator,
  getSpesificBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utility/validators/brandValidator");

const router = express.Router();

router.route("/").get(getBrands).post(
  uploadImage,
  resizeImage,createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getSpesificBrandValidator, getSpesificBrand)
  .put(
    uploadImage,
    resizeImage,updateBrandValidator, updateSpesificBrand)
  .delete(deleteBrandValidator, deleteSpesificBrand);

module.exports = router;
