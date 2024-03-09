const couponModel = require("../models/couponModel");
const factory = require("./handleFactory");
// const { v4: uuidv4 } = require("uuid");
// const sharp = require("sharp");
// const asyncHandler = require("express-async-handler");
// const { uploadSingleImage } = require("../middleware/uploadImageMiddelware");


// @desc    get list of coupons
// @route   GET api/v1/coupons
// @access  Private/Admin-Manager
exports.getCoupons = factory.getAll(couponModel);

// @desc    create Coupon 
// @route   POST api/v1/coupons
// @access  Private/Admin-Manager
exports.createCoupon = factory.createOne(couponModel);

// @desc    get spesific category
// @route   GET  /api/v1/coupons/:id
// @access  Private/Admin-Manager
exports.getCoupon = factory.getOne(couponModel);

// @desc    update spesific category
// @route   PUT /api/v1/coupons/:id
// @access  Private/Admin-Manager
exports.updateCoupon = factory.updateOnde(couponModel);

// @desc     delete spesific Coupon
// @route    DELETE /api/v1/coupons/:id
// @access   Private/Admin-Manager
exports.deleteCoupon = factory.deleteOne(couponModel);
