const { check } = require("express-validator");
const userModel = require("../../models/useModel");
const { default: slugify } = require("slugify");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");
const ApiError = require("../apiError");





exports.addUserAddressValidator = [
    check("alias")
        .optional()
        .custom(async (val, { req }) => {
            const user = await userModel.findById(req.user._id)
            if (user.addresses.some(add => add.alias === val)) {
                throw new Error(`this alias alredy exist : ${val}`)
            }
            return true
        }),

    check("details")
        .notEmpty()
        .withMessage("pleas added some address details"),
    check("phone")
        .optional()
        .isMobilePhone(["ar-MA", "ar-EG"])
        .withMessage("invalid phone number accept just Morroco and Egypt phone numbers "),
    check("city")
        .notEmpty()
        .withMessage("address city is required"),
    check("postalCode")
        .notEmpty()
        // .isPostalCode("MA")
        .withMessage("postal code is required"),
    ValidatoreMiddleware,
]

exports.removeUserAddressValidator = [
    check("addressID")
        .isMongoId()
        .withMessage("invalid address id"),
    ValidatoreMiddleware,
]