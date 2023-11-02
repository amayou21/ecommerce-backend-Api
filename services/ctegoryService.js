const { default: slugify } = require("slugify");
const { CategoryModel } = require("../models/CategoryModels");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utility/apiError");

// @desc    get list of categories
// @route   get api/v1//categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res, next) => {
  const { page } = req.query || 1;
  const { limit } = req.query || 5;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find().skip(skip).limit(limit);
  !categories
    ? next(new ApiError("there's no categories",400))
    : res.status(200).json({ result: categories.length, page, categories });
});

// @desc    create category
// @route   post apiv/categories
// @access  Private
exports.createCategories = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const newCategory = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(200).json(newCategory);
});

// @desc    get spesific category
// @route   put  /api/v1/categories/:id
// @access  Public
exports.getSpesificCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findById({ _id: id });
  !category
    ? next(new ApiError(`no ctegory with this is : ${id}`, 400))
    : res.status(200).json(category);
});

// @desc    update spesific category
// @route   put /api/v1/categories/:id
// @access  Private
exports.updateSpesificCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const upCategory = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    {
      new: true,
    }
  );
  !upCategory
    ? next(new ApiError(`no ctegory with this is : ${id}`, 400))
    : res.status(200).json(upCategory);
});

// @desc     delete spesific category
// @route    delete /api/v1/categories/:id
// @access   Private
exports.deleteSpesificCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete({ _id: id });
  !category
    ? next(new ApiError(`no ctegory with this is : ${id}`, 400))
    : res
        .status(200)
        .json({ mes: `the category with id :${id} deleted successfully` });
});
