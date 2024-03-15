const express = require("express");
const { protect, allowTo } = require("../services/authService");
const { crateCashOrder, setOrderFilterObj, getOrders, getOrder, updateOrderPaidState, updateOrderDeliveredState, checkouSession } = require("../services/orderService");
const { crateCashOrderValidator, getOrderValidator } = require("../utility/validators/orderValidator");

const router = express.Router();


router.route("/checkout-session/:cartId").get(protect, allowTo("user"), checkouSession)

router.route("/:cartId")
    .post(protect, allowTo("user"), crateCashOrderValidator, crateCashOrder);

router.route("/").get(protect, allowTo("user", "admin", "manager"), setOrderFilterObj, getOrders)


router
    .route("/:id")
    .get(protect, allowTo("user", "admin", "manager"), getOrderValidator, getOrder)


router.route("/:id/pay").put(protect, allowTo("admin", "manager"), updateOrderPaidState)
router.route("/:id/delivered").put(protect, allowTo("admin", "manager"), updateOrderDeliveredState)
module.exports = router;

