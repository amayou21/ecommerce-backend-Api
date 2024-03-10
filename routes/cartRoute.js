const express = require("express");


const { creatCartItemValidator, deleteCartValidator, updateItemQuantityValidator } = require("../utility/validators/cartValidator");
const {
  creatCart, getLoggetUserCart, deleteCartItem, clearCart, updateQuantity
} = require("../services/cartService");

const { protect, allowTo } = require("../services/authService");

const router = express.Router();
router.use(protect, allowTo("user"))
router.route("/")
  .get(getLoggetUserCart)
  .post(creatCartItemValidator, creatCart)
  .delete(clearCart)

router.route("/:itemId")
  .delete(deleteCartValidator, deleteCartItem)
  .put(updateItemQuantityValidator, updateQuantity)

module.exports = router;
