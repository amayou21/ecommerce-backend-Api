const { check } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");
const { CategoryModel } = require("../../models/CategoryModels");
const SUbCategoryModele = require("../../models/SUbCategoryModele");
const { default: slugify } = require("slugify");
const ProductModel = require("../../models/ProductModel")


exports.crateCashOrderValidator = [
    check("shippingAddress.phone")
        .optional()
        .isMobilePhone(["ar-MA", "ar-EG"])
        .withMessage("invalid phone number accept just Morroco and Egypt phone numbers "),
    ValidatoreMiddleware,
]