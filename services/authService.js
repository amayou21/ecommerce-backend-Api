const crypto = require("crypto")
const asyncHandler = require("express-async-handler")
const userModel = require("../models/useModel")

const ApiError = require("../utility/apiError")
const bcrypt = require("bcryptjs")
const sendEmail = require("../utility/sendEmail")
const createToken = require("../utility/createToken");
const jwt = require("jsonwebtoken")




// @desc     sign up
// @route    POST /api/v1/auth/signup
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
// @route    POST /api/v1/auth/login
// @access   Public
exports.login = asyncHandler(async (req, res, next) => {
    // @desc check if user exist
    // @desc check if password curecct
    const user = await userModel.findOne({ email: req.body.email })

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new ApiError("incorrect user email or password", 200))
    }

    // @desc generate token
    const token = createToken({ userID: user._id, email: user.email })

    res.status(200).json({ data: user, token })
})



// @desc     make sure the user is logged in
// @route    POST /api/v1/
// @access   Public
exports.protect = asyncHandler(async (req, res, next) => {
    // 1) check if token exist, if token exist get it
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return next(new ApiError("You are not login, please login to get access this route", 200))
    }

    // 2) check if this token valid (verify token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    // console.log(decoded);

    // 3) check if token iser exist
    const currentUser = await userModel.findById(decoded.userID)
    if (!currentUser) {
        return next(new ApiError("The user that belong to this token does no longer exist!", 401))
    }
    // 4) check if user change his password after tokent created

    if (currentUser.passwordChangedAT) {
        const passwordChangetTimeStamp = parseInt(currentUser.passwordChangedAT.getTime() / 1000, 10)

        if (passwordChangetTimeStamp > decoded.iat) {
            return next(new ApiError("User recently  changed his password,please login again...", 401))
        }
    }

    req.user = currentUser
    next()
})


// @desc  Authorization (User Permission)
// ["Admin","Manager"]
exports.allowTo = (...roles) => asyncHandler(async (req, res, next) => {
    // (...roles) => [par1,"par2",etc]
    if (!roles.includes(req.user.role)) {
        return next(new ApiError("You are not allowed to access this route", 403))
    }
    next()
})



// @desc   Forgot password
// @route  POST /api/v1/auth/forgotPassword
// @access Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {

    // 1) get user by email
    const user = await userModel.findOne({ email: req.body.email })
    if (!user) {
        return next(new ApiError(`there's no user with that email: ${req.body.email}`, 200))
    }

    // 2) if user exist, generate random 6 digits and save it in DB
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString()
    const resetCodeHash = crypto.createHash("sha256").update(resetCode).digest("hex")

    // save hashed password reset code into db
    user.passwordResetCode = resetCodeHash;

    // add expiration time for password reset code (10 min)
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000

    user.passwordResetVerified = false
    await user.save()

    // 3) send the reset code via email
    const message =
        `Hi ${user.name},\n We received a request to reset the password on your E-commerce Account .\n ${resetCode}\n Enter this code to complete the reset.\n thanks for helping us keep your account secure.\n The E-commerce Team`
    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset code (valid for 10 min)',
            message,
        })
        res.status(200).json({ status: "success", msg: `we sent you reset code in this email :${user.email}` })
    } catch (error) {
        user.passwordResetCode = undefined;
        user.passwordResetExpires = undefined
        user.passwordResetVerified = undefined
        await user.save()
        return next(new ApiError("There's an error in sending email", 500))
    }

})


// @desc   Verify Password Reset Code
// @route  POST /api/v1/auth/verifyPassResetCode
// @access Public
exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {

    // 1) get user based on reset code
    const resetCodeHash = crypto.createHash("sha256").update(req.body.resetCode).digest("hex")

    const user = await userModel.findOne({
        passwordResetCode: resetCodeHash,
        passwordResetExpires: { $gt: Date.now() },
    })

    if (!user) {
        return next(new ApiError("Reset code invalid or expired"))
    }
    // 2) reset code valid
    user.passwordResetVerified = true
    user.save()
    res.status(200).json({ status: "success" })
})



// @desc   Reset Password
// @route  POST /api/v1/auth/resetPassword
// @access Public
exports.resetPassword = asyncHandler(async (req, res, next) => {

    // 1) get user based on email
    const user = await userModel.findOne({ email: req.body.email })

    if (!user) {
        return next(new ApiError("thers's no user with this email", 200))
    }

    // 2) check if reset code verified
    if (!user.passwordResetVerified) {
        return next(new ApiError("Reset code not verified", 200))

    }

    user.password = req.body.newPassword
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined
    user.passwordResetVerified = undefined
    await user.save()

    // 3) if everythings is ok, generate token

    const token = createToken({ userID: user._id, email: user.email })

    res.status(200).json({ token })
})