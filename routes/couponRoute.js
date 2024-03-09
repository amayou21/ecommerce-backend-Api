const express = require("express");




const {

} = require("../utility/validators/brandValidator");

const { getCoupon, createCoupon, getCoupons, updateCoupon, deleteCoupon } = require("../services/couponService");

const { protect, allowTo } = require("../services/authService");
const { createCouponValidator, getCouponValidator, updateCouponValidator, deleteCouponValidator } = require("../utility/validators/couponValidator");

const router = express.Router();

router.use(protect, allowTo("admin", "manager"))

router.route("/")
  .get(getCoupons)
  .post(createCouponValidator, createCoupon);

router
  .route("/:id")

  .get(getCouponValidator, getCoupon)

  .put(updateCouponValidator, updateCoupon)

  .delete(deleteCouponValidator, deleteCoupon);

module.exports = router;
