
const asyncHandlaer = require("express-async-handler")
const userModel = require("../models/useModel")
const ApiError = require("../utility/apiError")

// @desc    Add product to wishlist
// @route   POST api/v1/wishlist
// @access  Protected/User
exports.AddProductToWishlist = asyncHandlaer(async (req, res, next) => {

    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        // $addToSet => add product to wishlist if not exist
        {
            $addToSet: { wishlist: req.body.product }
        },
        { new: true }
    )
    await user.save()
    res.status(200)
        .json({ status: "success", msg: "Product added  successfully to your wishlist.", data: user.wishlist })
})



// @desc    Add product to wishlist
// @route   POST api/v1/wishlist/:productID
// @access  Protected/User
exports.removeProductFomWishlist = asyncHandlaer(async (req, res, next) => {

    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        // $pull => remove product from wishlist if exist
        {
            $pull: { wishlist: req.params.productID }
        },
        { new: true }
    )
    await user.save()
    res.status(200)
        .json({ status: "success", msg: "Product deleted  successfully from your wishlist.", data: user.wishlist })
})



// @desc    get logged user wishlist
// @route   GET api/v1/wishlist/
// @access  Protected/User
exports.getLoggedUserWishlist = asyncHandlaer(async (req, res, next) => {

    const user = await userModel.findById(req.user._id).populate("wishlist")
    res.status(200).json({ status: "success", result: user.wishlist.length, data: user.wishlist })
})

