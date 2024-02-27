const { check } = require("express-validator");
const userModel = require("../../models/useModel");
const { default: slugify } = require("slugify");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");



exports.signUpValidator = [
    // @desc  1-rules
    check("name")
        .notEmpty()
        .withMessage("User name required")

        // check User name value
        .custom(val => {
            if (!isNaN(val) || !isNaN(parseFloat(val)))
                throw new Error(`User name must be a string`)
            return true
        })
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),

    check("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email address").
        // check if this email alredy exist
        custom(async (value) => {
            const existingCategory = await userModel.findOne({ email: value });
            if (existingCategory) {
                throw new Error("This email already exists");
            }
            return true;
        }),

    check("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 chracters")
        .custom((val, { req }) => {
            if (val !== req.body.passwordConfirm) {
                throw new Error("inccorect confirm password");

            }
            return true;
        }),
    check("passwordConfirm")
        .notEmpty()
        .withMessage("password confirm is required"),
    check("phone")
        .optional()
        .isMobilePhone(["ar-MA", "ar-EG"])
        .withMessage("invalid phone number accept just Morroco and Egypt phone numbers "),
    ValidatoreMiddleware,
];



exports.loginValidator = [
    check("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email address"),
    check("password")
        .notEmpty()
        .withMessage("password is required"),
    ValidatoreMiddleware,
]


exports.forgotPasswordValidator = [
    check("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email address"),
    ValidatoreMiddleware,
]


exports.resetPasswordValidator = [
    // check("name")
    // .notEmpty()
    // .withMessage("User name required")

    // // check User name value
    // .custom(val => {
    //     if (!isNaN(val) || !isNaN(parseFloat(val)))
    //         throw new Error(`User name must be a string`)
    //     return true
    // })
    // .custom((val, { req }) => {
    //     req.body.slug = slugify(val);
    //     return true;
    // }),

    check("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email address"),

    // check if this email alredy exist
    // custom(async (value) => {
    //     const existingCategory = await userModel.findOne({ email: value });
    //     if (existingCategory) {
    //         throw new Error("This email already exists");
    //     }
    //     return true;
    // })

    check("newPassword")
        .notEmpty()
        .withMessage("newPassword is required")
        .isLength({ min: 6 })
        .withMessage("newPassword must be at least 6 chracters")
        .custom((val, { req }) => {
            if (val !== req.body.passwordConfirm) {
                throw new Error("inccorect confirm password");

            }
            return true;
        }),
    check("passwordConfirm")
        .notEmpty()
        .withMessage("password confirm is required"),
    ValidatoreMiddleware,
]