const factory = require("./handleFactory");
const asyncHandler = require("express-async-handler");
const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");
const ApiError = require("../utility/apiError");
const ProductModel = require("../models/ProductModel");



// @desc    create cash order
// @route   POST api/v1/orders/cartId
// @access  Protected/User
exports.crateCashOrder = asyncHandler(async (req, res, next) => {

    // app settings
    const taxPrice = 0
    const shippingPrice = 0

    // 1) get cart based on cart ID 
    const cart = await cartModel.findById(req.params.cartId)
    if (!cart) {
        return next(new ApiError(`there is no cart with this ID : ${req.user._id}`, 404))
    }

    // 2) get order price depend on cart price "check if coupon apply"
    const cartPrice = cart.totalCartPriceAfterDiscount ? cart.totalCartPriceAfterDiscount : cart.totalCartPrice
    const totalOrderPrice = cartPrice + taxPrice + shippingPrice

    // 3) create order with default payment method cash
    const order = await orderModel.create(
        {
            user: req.user._id,
            cartItem: cart.cartItem,
            shippingAddress: req.body.shippingAddress,
            totalOrderPrice
        }
    )
    // 4)After creating order, decrement product quantity, increment product sold
    if (order) {
        const bulkOption = cart.cartItem.map(item => ({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantity, sold: + item.quantity } }
            },
        }))

        await ProductModel.bulkWrite(bulkOption, {})

        // 5) clear cart depend on cartid
        await cartModel.findByIdAndDelete(req.params.cartId)

        res.status(200).json({ status: "success", message: "order created successfully", date: order })
    }
})



// @desc set filter object
exports.setOrderFilterObj = asyncHandler(async (req, res, next) => {
    if (req.user.role === "user") {
        req.filterObj = { user: req.user._id }
    }
    next()
})

// @desc    get cash orders
// @route   GET api/v1/orders/
// @access  Protected/User-Admin-Manager
exports.getOrders = factory.getAll(orderModel)


// @desc    get spesific cash order
// @route   GET api/v1/orders/:id
// @access  Protected/User-Admin-Manager
exports.getOrder = factory.getOne(orderModel)