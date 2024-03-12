const { check } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");
const orderModel = require("../../models/orderModel");


exports.crateCashOrderValidator = [
    check("shippingAddress.phone")
        .optional()
        .isMobilePhone(["ar-MA", "ar-EG"])
        .withMessage("invalid phone number accept just Morroco and Egypt phone numbers "),
    ValidatoreMiddleware,
]


exports.getOrderValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid order ID")


        // @desc check if the logged user are the order owner
        .custom(async (val, { req }) => {
            const order = await orderModel.findById(val)
            if (order.user._id.toString() !== req.user._id.toString()) {
                throw new Error("there's no order with this ID");
            }
            return true;
        }),
    ValidatoreMiddleware,
]