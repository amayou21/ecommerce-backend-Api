
const { check } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");
const cartModel = require("../../models/cartModel");

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