const sharp = require("sharp");
const { uploadSingleImage } = require("../middleware/uploadImageMiddelware");
const { BrandModel } = require("../models/BrandModel");
const factory = require("./handleFactory");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

// @desc  image uploading
exports.uploadImage = uploadSingleImage("image");

// @desc  image proccessing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(900, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 100 })
    .toFile(`uploads/brands/${fileName}`);
  console.log(res.errored);
  req.body.image = fileName;
  next();
});

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
