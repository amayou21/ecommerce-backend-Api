const ProductModel = require("../models/ProductModel");
const factory = require("./handleFactory");

const {
  uploadGalleryOfImages,
  resizeProductImages,
} = require("../middleware/uploadImageMiddelware");

// @desc   upload one image or more using multer fields
exports.uploadimage = uploadGalleryOfImages([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 4 },
]);

// @desc resizing product images
exports.resizeImage = resizeProductImages;

// @desc     create product
// @route    post  /api/v1/products
// @access   Private
exports.createProduct = factory.createOne(ProductModel);


// @desc     get products
// @route    get /api/v1/products
// @access   Public
exports.getProducts = factory.getAll(ProductModel);

// @desc     get spesific product
// @route    get /apiv/products/:id
// @access   Private
exports.getProduct = factory.getOne(ProductModel, "reviews");

// @desc     updateProduct
// @route    put /api/v1/product/:id
// @access   Private
exports.updateProduct = factory.updateOnde(ProductModel);

// @desc     delete product
// @route    delete  /api/v1/product/:id
// @access   Private
exports.deleteProduct = factory.deleteOne(ProductModel);
