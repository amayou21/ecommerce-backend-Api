const multer = require("multer");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const multerOptions = () => {
  // const multerStorage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, "uploads/categories");
  //   },
  //   filename: function (req, file, cb) {
  //     const ext = file.mimetype.split("/")[1];
  //     const fileName = `category-${uuidv4()}-${Date.now()}.${ext}`;
  //     cb(null, fileName);
  //   },
  // });
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("only images allowed", 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload;
};

exports.uploadSingleImage = (fileName) => {
  return multerOptions().single(fileName);
};

exports.uploadGalleryOfImages = (fieldName) => {
  return multerOptions().fields(fieldName);
};

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  if (req.files.imageCover) {
    const fileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 100 })
      .toFile(`uploads/products/${fileName}`);
    req.body.imageCover = fileName;
  }
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (val, index) => {
        const fileName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
        await sharp(val.buffer)
          .resize(900, 900)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`uploads/products/${fileName}`);
        req.body.images.push(fileName);
      })
    );

  }
    next();
});
