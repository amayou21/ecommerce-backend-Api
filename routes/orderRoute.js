const express = require("express");
const { protect, allowTo } = require("../services/authService");
const { crateCashOrder, setOrderFilterObj, getOrders, getOrder } = require("../services/orderService");
const { crateCashOrderValidator, getOrderValidator } = require("../utility/validators/orderValidator");

const router = express.Router();

router.route("/:cartId")
    .post(protect, allowTo("user"), crateCashOrderValidator, crateCashOrder);

router.route("/").get(protect, allowTo("user", "admin", "manager"), setOrderFilterObj, getOrders)


router
    .route("/:id")

    .get(protect, allowTo("user", "admin", "manager"),getOrderValidator,getOrder)

//     .put()

//     .delete();

module.exports = router;

