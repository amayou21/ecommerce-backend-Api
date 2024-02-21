const express = require("express");
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadimage,
  resizeImage,
} = require("../services/productService");
const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utility/validators/productValidator");
const { protect, allowTo } = require("../services/authService");

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, allowTo("admin", "manager"), uploadimage, resizeImage, createProductValidator, createProduct);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(protect, allowTo("admin", "manager"), uploadimage, resizeImage, updateProductValidator, updateProduct)
  .delete(protect, allowTo("admin"), deleteProductValidator, deleteProduct);
module.exports = router;
