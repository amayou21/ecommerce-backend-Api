const asyncHandler = require("express-async-handler")
const userModel = require("../models/useModel")

const jwt = require("jsonwebtoken")
const ApiError = require("../utility/apiError")
const bcrypt = require("bcryptjs")

const createToken = (payload) =>
    jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRED_TIME
    })



// @desc     sign up
// @route    /api/v1/auth/signup
// @access   Public
exports.signUp = asyncHandler(async (req, res, next) => {
    // @desc create user
    const user = await userModel.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,

    })


    // @desc generate token
    const token = createToken({ userID: user._id, email: user.email })

    res.status(200).json({ data: user, token })
})




// @desc     login
// @route    /api/v1/auth/login
// @access   Public
exports.login = asyncHandler(async (req, res, next) => {
    // @desc check if user exist
    // @desc check if password curecct
    const user = await userModel.findOne({ email: req.body.email })

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new ApiError("incorrect user email or password "))
    }

    // @desc generate token
    const token = createToken({ userID: user._id, email: user.email })

    res.status(200).json({ data: user, token })
})