const { BrandModel } = require("../models/BrandModel");
const factory = require("./handleFactory");

// @desc    get list of brands
// @route   get api/v1//brands
// @access  Public
exports.getBrands = factory.getAll(BrandModel);

// @desc    create Brand
// @route   post apiv/brands
// @access  Private
exports.createBrand = factory.createOne(BrandModel);

// @desc    get spesific Brand
// @route   put  /api/v1/brands/:id
// @access  Public
exports.getSpesificBrand = factory.getOne(BrandModel);

// @desc    update spesific Brand
// @route   put /api/v1/categories/:id
// @access  Private
exports.updateSpesificBrand = factory.updateOnde(BrandModel);

// @desc     delete spesific Brand
// @route    delete /api/v1/categories/:id
// @access   Private
exports.deleteSpesificBrand = factory.deleteOne(BrandModel);
