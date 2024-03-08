const { CategoryModel } = require("../models/CategoryModels");
const factory = require("./handleFactory");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const { uploadSingleImage } = require("../middleware/uploadImageMiddelware");


exports.uploadImage = uploadSingleImage("image")

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `category-${uuidv4()}-${Date.now()}.jpeg`;
  // console.log(req);
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(900, 900)
      .toFormat("jpeg")
      .jpeg({ quality: 100 })
      .toFile(`uploads/categories/${fileName}`);
    // console.log(res.errored);
    req.body.image = fileName;
  }

  next();
});

// @desc    get list of cIategories
// @route   get api/v1//categories
// @access  Public
exports.getCategories = factory.getAll(CategoryModel);

// @desc    create category
// @route   post api/v1/categories
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
