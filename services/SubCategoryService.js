const asyncHandler = require("express-async-handler");
const SUbCategoryModele = require("../models/SUbCategoryModele");
const factory = require("./handleFactory");
const { uploadSingleImage } = require("../middleware/uploadImageMiddelware");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

// @desc  image uploading
exports.uploadImage = uploadSingleImage("image");

// @desc  image proccessing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `subcategory-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(900, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 100 })
    .toFile(`uploads/subcategories/${fileName}`);
  console.log(res.errored);
  req.body.image = fileName;
  next();
});

// @desc   set category ID if I create a subcategory in spesific category
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
