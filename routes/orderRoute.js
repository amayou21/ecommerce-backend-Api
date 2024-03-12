const express = require("express");
const { protect, allowTo } = require("../services/authService");
const { crateCashOrder } = require("../services/orderService");
const { crateCashOrderValidator } = require("../utility/validators/orderValidator");

const router = express.Router();

router.route("/:cartId")
    // .get()
    .post(protect, allowTo("user"), crateCashOrderValidator, crateCashOrder);

// router
//     .route("/:id")

//     .get()

//     .put()

//     .delete();

module.exports = router;

