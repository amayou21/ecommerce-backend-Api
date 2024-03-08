const express = require("express");

const {
  AddProductToWishlist, removeProductFomWishlist, getLoggedUserWishlist,
} = require("../services/wishListService");

const { protect, allowTo } = require("../services/authService");

const router = express.Router();

router.use(protect, allowTo("user"))

router.route("/").get(getLoggedUserWishlist).post(AddProductToWishlist);

router.route("/:productID").delete(removeProductFomWishlist);


module.exports = router;