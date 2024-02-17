const { check, body } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");
const { default: slugify } = require("slugify");
const userModel = require("../../models/useModel")
const bcrypt = require("bcryptjs")
// @desc    errors validator outside express for create category middleware
exports.createUserValidator = [
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
        .withMessage("invalid phone number accept just Morroco and Egypt phone numbers ")
    ,

    check("profileImg")
        .optional(),

    check("role")
        .optional(),
    // @desc  2- catch errors if the rules not exist
    ValidatoreMiddleware,
];

exports.getSpesificUserValidator = [
    check("id")
        .isMongoId()
        .withMessage("invalid User Id format"),
    ValidatoreMiddleware,
];

exports.updateUserValidator = [
    check("name")
        .optional()
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
        .optional()
        .isEmail()
        .withMessage("invalid email address")

        // check if this email alredy exist
        .custom(async (value) => {
            const existingCategory = await userModel.findOne({ email: value });
            if (existingCategory) {
                throw new Error("This email already exists");
            }
            return true;
        }),

    // check("password")
    //     .optional()
    //     .isLength({ min: 6 })
    //     .withMessage("password must be at least 6 chracters")
    // ,
    check("phone")
        .optional()
        .isMobilePhone(["ar-MA", "ar-EG"])
        .withMessage("invalid phone number accept just Morroco and Egypt phone numbers ")
    ,

    check("profileImg")
        .optional(),

    check("role")
        .optional(),
    check("id")
        .isMongoId()
        .withMessage("invalid User Id format"),
    ValidatoreMiddleware,
];

exports.changeUserPasswordValidator = [

    check("id")
        .isMongoId()
        .withMessage("invalid User Id format"),

    body("curentpassword")
        .notEmpty()
        .withMessage("you must enter current password"),

    body("passwordConfirm")
        .notEmpty()
        .withMessage("you must confirm password"),

    body("password")
        .notEmpty()
        .withMessage("you must enter new password")
        .isLength({ min: 6 })
        .withMessage("new password must br at least 6 chatacyers")

        // @desc verify current password
        .custom(async (val, { req }) => {
            const user = await userModel.findById(req.params.id)
            if (!user) {
                throw new Error("there is no user with this id")
            }
            const isConfirm = await bcrypt.compare(req.body.curentpassword, user.password)
            if (!isConfirm) {
                throw new Error("incurrect curent password ")
            }
            return true
        })
        // @desc verify confirm password
        .custom((val, { req }) => {
            if (val !== req.body.passwordConfirm) {
                throw new Error("inccorect confirm password");
            }
            return true;
        }),
    ValidatoreMiddleware,

]

exports.deleteUserValidator = [
    check("id")
        .isMongoId()
        .withMessage("invalid User Id format"),
    ValidatoreMiddleware,
];
