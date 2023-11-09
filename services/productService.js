const asyncHandler = require("express-async-handler");
const { default: slugify } = require("slugify");
const ProductModel = require("../models/ProductModel");
const ApiError = require("../utility/apiError");

// @desc     create product
// @route    post  /api/v1/products
// @access   Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  const product = await ProductModel.create(req.body);
  
  res.status(200).json({ data: product });
});

// @desc     get products
// @route    get /api/v1/products
// @access   Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await ProductModel.find().populate({
    path: "category",
    select: "name -_id",
  });
  res.status(200).json({ result: products.length, data: products });
});

// @desc     get spesific product
// @route    get /apiv/products/:id
// @access   Private
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findById({ _id: id }).populate({
    path: "category",
    select: "name -_id",
  });
  !product
    ? next(new ApiError(`no product with is :${id}`, 400))
    : res.status(200).json({ data: product });
});

// @desc     updateProduct
// @route    put /api/v1/product/:id
// @access   Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  req.body.title ? (req.body.slug = slugify(req.body.title)) : null;
  const product = await ProductModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  !product
    ? next(new ApiError(`no product with this id :${id}`, 400))
    : res.status(200).json({ data: product });
});

// @desc     delete product
// @route    delete  /api/v1/product/:id
// @access   Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findOneAndDelete({ _id: id });
  !product
    ? next(new ApiError(`no prduct with this id :${id}`, 400))
    : res
        .status(200)
        .json({ message: `the product with id ${id} deleted succefully` });
});
