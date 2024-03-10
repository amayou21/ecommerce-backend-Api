
const { check } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");
const cartModel = require("../../models/cartModel");
const couponModel = require("../../models/couponModel");

exports.creatCartItemValidator = [
    // @desc  1-rules
    check("productID")
        .isMongoId()
        .withMessage("Invalid product ID"),
    check("color")
        .optional(),
    ValidatoreMiddleware,
];


exports.deleteCartValidator = [
    // @desc  1-rules
    check("itemId")
        .isMongoId()
        .withMessage("Invalid cart item ID")
        .custom(async (val, { req }) => {
            const cart = await cartModel.findOne({ user: req.user._id })
            const itemIndex = cart.cartItem.findIndex(item => item._id.toString() === val)
            if (itemIndex === -1) {
                throw new Error(`there is no item with this id : ${val}`)
            }
            return true
        }),
    ValidatoreMiddleware,
];


exports.updateItemQuantityValidator = [
    check("quantity")
        .notEmpty()
        .withMessage("Product quantity is required to make update"),
    check("itemId")
        .isMongoId()
        .withMessage("Invalid product ID"),
    ValidatoreMiddleware,
]


exports.applyCouponValidator = [
    check("coupon")
        .notEmpty()
        .withMessage("coupon name is required to apply it")
        .custom(async (val, { req }) => {
            const coupon = await couponModel.findOne({
                name: val, expire: { $gt: Date.now() }
            })
            
            if (!coupon) {
                throw new Error("Invalid coupon or expired")
            }
            return true
        }),
    ValidatoreMiddleware,
]