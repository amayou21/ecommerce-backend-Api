const { check } = require("express-validator");
const ValidatoreMiddleware = require("../../middleware/validatoreMiddleware");
const { CategoryModel } = require("../../models/CategoryModels");
const SUbCategoryModele = require("../../models/SUbCategoryModele");
const { default: slugify } = require("slugify");
const ProductModel = require("../../models/ProductModel")


exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("product title is required")
    .isLength({ max: 100 })
    .withMessage("Too long Product title")
    .isLength({ min: 3 })
    .withMessage("Too short Product title")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    })
    .custom(val => {
      if (!isNaN(val) || !isNaN(parseFloat(val)))
        throw new Error(`product name must be a string`)
      return true
    })
    .custom(async (value) => {
      const existingCategory = await ProductModel.findOne({ name: value });
      if (existingCategory) {
        throw new Error("This product already exists");
      }
      return true;
    }),
  check("description")
    .notEmpty()
    .withMessage("product descreption is required")
    .isLength({ min: 20 })
    .withMessage("Too short Product description"),
  check("quantity")
    .notEmpty()
    .withMessage("Product Quantity is required")
    .isNumeric("Products quantity must be a number"),
  check("sold").optional().isNumeric("Product sold must be a Number"),
  check("price")
    .notEmpty()
    .withMessage("Products price is required")
    .isNumeric("Products price must be a numer")
    .isLength({ max: 2000000 })
    .withMessage("Too long price"),
  check("priceAfterDescount")
    .optional()
    .toFloat()
    // .withMessage("price after descount must be a number")
    .custom((val, { req }) => {
      if (req.body.price <= val) {
        throw new Error("price after descount must be lower than price");
      }
      return true;
    }),
  check("colors")
    .optional()
    // .isArray()
    // .withMessage("colors must be array of string")
    ,
  check("imageCover").notEmpty().withMessage("Product image cover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to category")
    .isMongoId()
    .withMessage("Ivalid category Id format ")
    .custom(async (categoryID) => {
      const category = await CategoryModel.findById(categoryID);
      if (!category) throw new Error("no category with this id");
      return true;
    }),
  check("subcategory")
    .optional()
    .isMongoId()
    .withMessage("Invalid subcategory ID format")
    .custom(async (categoriesIds) => {
      const subcategories = await SUbCategoryModele.find({
        _id: { $exists: true, $in: categoriesIds },
      });
      if (subcategories < 1 || subcategories.length !== categoriesIds.length)
        throw new Error("invalid subcategories ids");
    })
    .custom(async (value, { req }) => {
      const subCategories = await SUbCategoryModele.find({
        category: req.body.category,
      });
      const subCategoriesIdsDB = [];
      subCategories.forEach((subCategory) =>
        subCategoriesIdsDB.push(subCategory._id.toString())
      );
      if (!value.every((v) => subCategoriesIdsDB.includes(v)))
        throw new Error("this subcategories ids not belong to category");
    }),

  check("brand").optional().isMongoId().withMessage("Invalid brand ID format"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("Ratings average must be a number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5.0"),
  check("ratingQuantity")
    .optional()
    .isNumeric()
    .withMessage(" Rating quantity must be a number"),
  ValidatoreMiddleware,
];

exports.getProductValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Product Id")
    .notEmpty()
    .withMessage("must be passt an Id to get spesific Product"),
  ValidatoreMiddleware,
];

exports.updateProductValidator = [
  check("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    })
    .custom(val => {
      if (!isNaN(val) || !isNaN(parseFloat(val)))
        throw new Error(`product name must be a string`)
      return true
    })
    .custom(async (value) => {
      const existingCategory = await ProductModel.findOne({ name: value });
      if (existingCategory) {
        throw new Error("This product already exists");
      }
      return true;
    }),
  check("id")
    .isMongoId()
    .withMessage("Invalid Product Id")
    .notEmpty()
    .withMessage("must be passt an Id to get spesific Product"),
  check("category")
    .optional()
    .custom(async (categoryID) => {
      const category = await CategoryModel.findById(categoryID);
      if (!category) throw new Error("no category with this id");
      return true;
    }),
  ValidatoreMiddleware,
];

exports.deleteProductValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Product Id")
    .notEmpty()
    .withMessage("must be passt an Id to get spesific Product"),
  ValidatoreMiddleware,
];
