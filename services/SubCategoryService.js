const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const SUbCategoryModele = require("../models/SUbCategoryModele");
const ApiError = require("../utility/apiError");

exports.setCategoryID = asyncHandler(async (req, res, next) => {
  req.params.categoryId ? (req.body.category = req.params.categoryId) : null;
  next();
});

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

exports.setFillterObject = asyncHandler(async (req, res, next) => {
  // let filterObject = {};
  req.params.categoryId ? (req.filterObject = req.params.categoryId) : null;
  next();
});

// @desc     get subCategories
// @route    get /api/v1/subCategories
// @access   Public
exports.getSubCategories = asyncHandler(async (req, res, next) => {
  const { page } = req.query || 1;
  const { limit } = req.query || 5;
  const skip = (page - 1) * limit;
  // let filterObject = {};
  // req.params.categoryId
  //   ? (filterObject = { category: req.params.categoryId })
  //   : null;
  const subCategories = await SUbCategoryModele.find({category:req.filterObject})
    .skip(skip)
    .limit(limit);
  // .populate({ path: "category", select: "name -_id" });
  res.status(200).json({
    categoryId: req.params,
    result: subCategories.length,
    subCategories,
  });
});

// @desc    get spesific subCategory
// @route   get /api/v1/subcategories/:id
// @access  Public
exports.getSpesificSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SUbCategoryModele.findById({ _id: id });
  // .populate({
  //   path: "category",
  //   select: "name -_id",
  // });
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
    { name, category, slug: slugify(name) },
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
