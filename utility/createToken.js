const jwt = require("jsonwebtoken")

// @desc    create token
const createToken = (payload) =>
    jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRED_TIME
    })
module.exports = createToken