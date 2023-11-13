const asyncHandler = require("express-async-handler");
const SUbCategoryModele = require("../models/SUbCategoryModele");
const factory = require("./handleFactory");

exports.setCategoryID = asyncHandler(async (req, res, next) => {
  req.params.categoryId ? (req.body.category = req.params.categoryId) : null;
  next();
});

// @desc     create subCategory
// @route    post  /api/v1/subcategory
// @access   Private
exports.createSubCategory = factory.createOne(SUbCategoryModele);

// @desc     get subCategories
// @route    get /api/v1/subCategories
// @access   Public
exports.getSubCategories = factory.getAll(SUbCategoryModele);

// @desc    get spesific subCategory
// @route   get /api/v1/subcategories/:id
// @access  Public
exports.getSpesificSubCategory = factory.getOne(SUbCategoryModele);

// @desc    update spesific subCategory
// @route   put /api/v1/subcategories/:id
// @access  Private
exports.updateSpesificSubCategory = factory.updateOnde(SUbCategoryModele);

// @desc    delete spesific subCategory
// @route   delete /api/v1/subcategories/:id
// @access  Private
exports.deleteSpesificSubCategory = factory.deleteOne(SUbCategoryModele);
