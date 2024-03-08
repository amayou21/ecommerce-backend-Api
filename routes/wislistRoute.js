const express = require("express");

const {
  AddProductToWishlist, removeProductFomWishlist, getLoggedUserWishlist,
} = require("../services/wishListService");

const { protect, allowTo } = require("../services/authService");
const { addProductToWishlistValidator } = require("../utility/validators/wishlistValidator");

const router = express.Router();

router.use(protect, allowTo("user"))

router.route("/").get(getLoggedUserWishlist).post(addProductToWishlistValidator, AddProductToWishlist);

router.route("/:productID").delete(removeProductFomWishlist);


module.exports = router;