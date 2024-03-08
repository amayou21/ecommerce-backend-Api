const { check, body } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");
const { default: slugify } = require("slugify");
const { CategoryModel } = require("../../models/CategoryModels");


exports.addProductToWishlistValidator = [
    check("product")
        .isMongoId()
        .withMessage("invalid product id")
    , ValidatoreMiddleware,
]

exports.removeProductFomWishlistValidator = [
    check("productID")
        .isMongoId()
        .withMessage("invalid product id")
]