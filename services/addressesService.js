
const asyncHandlaer = require("express-async-handler")
const userModel = require("../models/useModel")
const ApiError = require("../utility/apiError")

// @desc    Add address
// @route   POST api/v1/addresses
// @access  Protected/User
exports.addUserAddress = asyncHandlaer(async (req, res, next) => {

    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        // $addToSet => add address if not exist
        {
            $addToSet: { addresses: req.body }
        },
        { new: true }
    )
    await user.save()
    res.status(200)
        .json({ status: "success", msg: "address added  successfully.", data: user.addresses })
})



// @desc    remove address 
// @route   DELETE api/v1/addresses/:addressID
// @access  Protected/User
exports.removeUserAddress = asyncHandlaer(async (req, res, next) => {

    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        // $pull => remove address if exist
        {
            $pull: { addresses: { _id: req.params.addressID } }
        },
        // { new: true }
    )
    await user.save()
    res.status(200)
        .json({ status: "success", msg: "address deleted successfully ." })
})


// @desc    remove all address 
// @route   DELETE api/v1/addresses/
// @access  Protected/User
exports.removeAllUserAddress = asyncHandlaer(async (req, res, next) => {

    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        // $pull => remove address if exist
        { $set: { addresses: [] } },
        // { new: true }
    )
    await user.save()
    res.status(200)
        .json({ status: "success", msg: "all address deleted successfully." })
})

// @desc    get logged user wishlist
// @route   GET api/v1/wishlist/
// @access  Protected/User
exports.getLoggedUserAddress = asyncHandlaer(async (req, res, next) => {

    const user = await userModel.findById(req.user._id).populate("addresses")
    res.status(200).json({ status: "success", result: user.addresses.length, data: user.addresses })
})

