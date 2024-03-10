const asyncHandler = require("express-async-handler");
const cartModel = require("../models/cartModel")
const productModel = require("../models/ProductModel");
const ApiError = require("../utility/apiError");


// calculate Total Cart Price
const calcTotalCartPrice = (cart) => {
    let totalPrice = 0
    cart.cartItem.forEach((val) => {
        totalPrice += val.price * val.quantity
    })
    cart.totalCartPrice = totalPrice
}


// @desc    create cart
// @route   POST  /api/v1/cart
// @access  Protect/User
exports.creatCart = asyncHandler(async (req, res, next) => {
    const { productID, color } = req.body

    const product = await productModel.findById(productID)

    // 1) get Cart for logged user
    let cart = await cartModel.findOne({ user: req.user._id })

    if (!cart) {

        //  create cart for logged user with product
        cart = await cartModel.create({
            user: req.user._id,
            cartItem: [{
                product: productID, color, price: product.price
            }]
        })
    } else {
        const productIndex = cart.cartItem.findIndex((val) => val.product.toString() === productID && val.color === color)

        // product exist to cart , increment quantity
        if (productIndex > -1) {
            const item = cart.cartItem[productIndex];
            item.quantity += 1;
            cart.cartItem[productIndex] = item
        } else {
            // product not exist to cart , push product to cartItem array
            cart.cartItem.push({
                product: productID, color, price: product.price
            })
        }
    }


    // calculate cart products price
    calcTotalCartPrice(cart)
    await cart.save()
    res.status(200).json({ status: "success", numOfCartItems: cart.cartItem.length, data: cart })
})




// @desc    get logged user cart
// @route   GET  /api/v1/cart
// @access  Protect/User
exports.getLoggetUserCart = asyncHandler(async (req, res, next) => {
    const cart = await cartModel.findOne({ user: req.user._id })
    if (!cart) {
        return next(new ApiError(`there is no cart fot this user ${req.user._id}`, 404))
    }
    res.status(200).json({ status: "success", numOfCartItems: cart.cartItem.length, data: cart })
})


// @desc    delete spesific cart item
// @route   DELETE  /api/v1/cart/:itemId
// @access  Protect/User
exports.deleteCartItem = asyncHandler(async (req, res, next) => {
    const cart = await cartModel.findOneAndUpdate(
        { user: req.user._id },

        {
            $pull: { cartItem: { _id: req.params.itemId } }
        },
        { new: true }
    )

    calcTotalCartPrice(cart)
    await cart.save()

    res.status(200).json({ status: "success", numOfCartItems: cart.cartItem.length, data: cart })
})


// @desc    clear cart
// @route   DELETE  /api/v1/cart
// @access  Protect/User
exports.clearCart = asyncHandler(async (req, res, next) => {
    const cart = await cartModel.findOneAndDelete({ user: req.user._id })
    if (!cart) {
        return next(new ApiError("There is nor cart for this user", 404))
    }
    res.status(200).send()
})


// @desc    update spesific cart item quantity
// @route   PUT  /api/v1/cart/itemId
// @access  Protect/User
exports.updateQuantity = asyncHandler(async (req, res, next) => {
    const { quantity } = req.body
    const cart = await cartModel.findOne({ user: req.user._id })

    if (!cart) {
        return next(new ApiError("there is no cart for this user", 404))
    } else {
        const itemIndex = cart.cartItem.findIndex(val => val._id = req.params.itemId)

        if (itemIndex > -1) {
            const changeItem = cart.cartItem[itemIndex]
            changeItem.quantity = quantity
            cart.cartItem[itemIndex] = changeItem
        }
        calcTotalCartPrice(cart)
        await cart.save()
    }

    res.status(200).json({ status: "success", numOfCartItems: cart.cartItem.length, data: cart })

})