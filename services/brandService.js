const { default: slugify } = require("slugify");
const { BrandModel } = require("../models/BrandModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utility/apiError");

// @desc    get list of brands
// @route   get api/v1//brands
// @access  Public
exports.getBrands = asyncHandler(async (req, res, next) => {
  const { page } = req.query || 1;
  const { limit } = req.query || 5;
  const skip = (page - 1) * limit;
  const brands = await BrandModel.find().skip(skip).limit(limit);
  res.status(200).json({ result: brands.length, page, brands });
});

// @desc    create Brand
// @route   post apiv/brands
// @access  Private
exports.createBrand = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const brand = await BrandModel.create({ name, slug: slugify(name) });
  res.status(200).json(brand);
});

// @desc    get spesific Brand
// @route   put  /api/v1/brands/:id
// @access  Public
exports.getSpesificBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findById({ _id: id });
  !brand
    ? next(new ApiError(`no brand with this is : ${id}`, 400))
    : res.status(200).json(brand);
});

// @desc    update spesific Brand
// @route   put /api/v1/categories/:id
// @access  Private
exports.updateSpesificBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await BrandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    {
      new: true,
    }
  );
  !brand
    ? next(new ApiError(`no brand with this is : ${id}`, 400))
    : res.status(200).json(brand);
});

// @desc     delete spesific Brand
// @route    delete /api/v1/categories/:id
// @access   Private
exports.deleteSpesificBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findByIdAndDelete({ _id: id });
  !brand
    ? next(new ApiError(`no ctegory with this is : ${id}`, 400))
    : res
        .status(200)
        .json({ mes: `the brand with id :${id} deleted successfully` });
});
