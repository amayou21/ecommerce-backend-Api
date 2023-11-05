const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const SUbCategoryModele = require("../models/SUbCategoryModele");
const ApiError = require("../utility/apiError");

// @desc     create subCategory
// @route    post  /api/v1/subcategory
// @access   Private
exports.createSubCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { category } = req.body;
  const subCategory = await SUbCategoryModele.create({
    name,
    category,
    slug: slugify(name),
  });
  res.status(200).json(subCategory);
});

// @desc     get subCategories
// @route    get /api/v1/subCategories
// @access   Public
exports.getSubCategories = asyncHandler(async (req, res, next) => {
  const { page } = req.query || 1;
  const { limit } = req.query || 5;
  const skip = (page - 1) * limit;
  const subCategories = await SUbCategoryModele.find().skip(skip).limit(limit);
  res.status(200).json({ result: subCategories.length, subCategories });
});

// @desc    get spesific subCategory
// @route   get /api/v1/subcategories/:id
// @access  Public
exports.getSpesificSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SUbCategoryModele.findById({ _id: id });
  !subCategory
    ? next(new ApiError(`no subCategory with this ID : ${id}`))
    : res.status(200).json(subCategory);
});

// @desc    update spesific subCategory
// @route   put /api/v1/subcategories/:id
// @access  Private
exports.updateSpesificSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCategory = await SUbCategoryModele.findOneAndUpdate(
    { _id: id },
    { name, category },
    { new: true }
  );
  !subCategory
    ? next(new ApiError(`no subCategory with this ID : ${id}`))
    : res.status(200).json(subCategory);
});

// @desc    delete spesific subCategory
// @route   delete /api/v1/subcategories/:id
// @access  Private
exports.deleteSpesificSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SUbCategoryModele.findOneAndDelete({ _id: id });
  !subCategory
    ? next(new ApiError(`no subCategory with this ID : ${id}`))
    : res.status(200).json({
        message: `the subCategory with id : ${id} deleted succesfully`,
      });
});
