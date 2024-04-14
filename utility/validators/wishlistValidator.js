const { check, body } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");
const { default: slugify } = require("slugify");
const { CategoryModel } = require("../../models/CategoryModels");
const productModel = require("../../models/ProductModel")

exports.addProductToWishlistValidator = [
    check("product")
        .isMongoId()
        .withMessage("invalid product id")
        .custom(async (val, { req }) => {
            const prod = await productModel.findById(val)
            if (!prod) {
                throw new Error(`there is no product with this ID : ${val}`)
            }
            return true
        })
    , ValidatoreMiddleware,
]

exports.removeProductFomWishlistValidator = [
    check("productID")
        .isMongoId()
        .withMessage("invalid product id")
]