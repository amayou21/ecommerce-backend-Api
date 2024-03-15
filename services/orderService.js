const factory = require("./handleFactory");
const asyncHandler = require("express-async-handler");
const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");
const ApiError = require("../utility/apiError");
const ProductModel = require("../models/ProductModel");
const stripe = require('stripe')('sk_test_51Otu0t2MJ44XoxRAaUkA5nRzLf6daCZ9nuvQHJNGgCQu4sc70ZQCZcwxrH3pqzK68c95fPKDNEjuxZEK59Ne7uLS00PoEVJyvB');


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


// @desc    update order paid status to true
// @route   UPDATE api/v1/orders/:id/pay
// @access  Protected/Admin-Manager
exports.updateOrderPaidState = asyncHandler(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id)
    if (!order) {
        return next(ApiError(`there is no order with this ID : ${req.params.id}`))
    }

    order.isPaid = true
    order.paidAt = Date.now()
    const newOrder = await order.save()

    res.status(200).json({ status: "success", message: "order  paid state changed successfully", date: newOrder })
})


// @desc    update order delivered status to true
// @route   UPDATE api/v1/orders/:id/pay
// @access  Protected/Admin-Manager
exports.updateOrderDeliveredState = asyncHandler(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id)
    if (!order) {
        return next(ApiError(`there is no order with this ID : ${req.params.id}`))
    }

    order.isDelivered = true
    order.deliveredAt = Date.now()
    const newOrder = await order.save()

    res.status(200).json({ status: "success", message: "order  delivered state changed successfully", date: newOrder })
})


// @desc    Get checkout session from stripe and send it as a response
// @route   GET api/v1/orders/checkout-session/:cartId
// @access  Protected/User
exports.checkouSession = asyncHandler(async (req, res, next) => {
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
    // const totalOrderPrice = cartPrice + taxPrice + shippingPrice

    // 3) create stripe checkout session stripe.checkout.sessions.create
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'mad',
                    product_data: {
                        name: req.user.name,
                    },
                    unit_amount: cartPrice * 100,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        // success_url: `${req.protocol}://${req.get('host')}/orders`,
        success_url: `http://localhost:3000/user/allorders`,
        // cancel_url: `${req.protocol}://${req.get('host')}/cart`,
        cancel_url: `http://localhost:3000/cart`,
        customer_email: req.user.email,
       
        customer_phone: req.user.phone,
        client_reference_id: req.params.cartId,
        metadata: req.body.shippingAddress,
    });

    // 4) send session to response
    res.status(200).json({ status: "success", session })

})