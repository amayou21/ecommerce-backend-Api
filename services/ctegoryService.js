const { CategoryModel } = require("../models/CategoryModels");
const factory = require("./handleFactory");

// @desc    get list of categories
// @route   get api/v1//categories
// @access  Public
exports.getCategories = factory.getAll(CategoryModel);

// @desc    create category
// @route   post apiv/categories
// @access  Private
exports.createCategories = factory.createOne(CategoryModel);

// @desc    get spesific category
// @route   put  /api/v1/categories/:id
// @access  Public
exports.getSpesificCategory = factory.getOne(CategoryModel);

// @desc    update spesific category
// @route   put /api/v1/categories/:id
// @access  Private
exports.updateSpesificCategory = factory.updateOnde(CategoryModel);

// @desc     delete spesific category
// @route    delete /api/v1/categories/:id
// @access   Private
exports.deleteSpesificCategory = factory.deleteOne(CategoryModel);
