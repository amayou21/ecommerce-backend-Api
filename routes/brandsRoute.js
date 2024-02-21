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
const { protect, allowTo } = require("../services/authService");

const router = express.Router();

router.route("/")
  .get(getBrands)
  .post(
    protect, allowTo("admin", "manager"),
    uploadImage,
    resizeImage, createBrandValidator, createBrand);

router
  .route("/:id")

  .get(getSpesificBrandValidator, getSpesificBrand)

  .put(
    protect, allowTo("admin", "manager"),
    uploadImage,
    resizeImage, updateBrandValidator, updateSpesificBrand)

  .delete(protect, allowTo("admin"), deleteBrandValidator, deleteSpesificBrand);

module.exports = router;
