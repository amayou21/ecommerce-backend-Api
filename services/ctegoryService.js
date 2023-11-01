const { default: slugify } = require("slugify");
const { CategoryModel } = require("../models/CategoryModels");
const asyncHandler = require("express-async-handler");

// @desc    get list of categories
// @route   get api/v1//categories
// @access  Public
exports.getCategories = async (req, res) => {
  const { page } = req.query || 1;
  const { limit } = req.query || 5;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find().skip(skip).limit(limit);
  res.status(200).json({ result: categories.length, page, categories });
};

// @desc    create category
// @route   post apiv/categories
// @access  Private
exports.createCategories = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const newCategory = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(200).json(newCategory);
});

// @desc    get spesific category
// @route   put  /api/v1/categories/:id
// @access  Public
exports.getSpesificCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findById({ _id: id });
  !category
    ? res.status(404).send({ message: `no ctegory with this is : ${id}` })
    : null;
  res.status(200).json(category);
});

// @desc    update spesific category
// @route   put /api/v1/categories/:id
// @access  Private
exports.updateSpesificCategory = asyncHandler(async (req, res) => {
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
    ? res.status(404).json({ mes: `there's no category with this id :${id}` })
    : null;
  res.status(200).json(upCategory);
});

// @desc     delete spesific category
// @route    delete /api/v1/categories/:id
// @access   Private
exports.deleteSpesificCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete({ _id: id });
  !category
    ? res.status(404).json({ mes: `there's no category with this id :${id}` })
    : null;
  res
    .status(200)
    .json({ mes: `the category with id :${id} deleted successfully` });
});
