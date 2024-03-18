const reviewModel = require("../models/reviewModel")
const factory = require("./handleFactory");


// NESTED ROUTE
// GET /api/v1/products/:productID/reviews
exports.createFilterObj = (req, res, next) => {
    let filterObject = {};
    if (req.params.productID) {
        filterObject = { product: req.params.productID }
    }
    req.filterObj = filterObject
    next();
};


// @desc    get list of reviews
// @route   get api/v1//reviews
// @access  Public
exports.getReviews = factory.getAll(reviewModel);



// NESTED ROUTE(create)
exports.setProductIDAndUserIdToBody = (req, res, next) => {
    if (!req.body.product) {
        req.body.product = req.params.productID
    }
    if (!req.body.user) {
        req.body.user = req.user._id.toString()
    }
    // console.log(req.params.productID,req.user._id.toString());
    next();
};


// @desc    create review
// @route   post apiv/reviews
// @access  Public/User
exports.createReview = factory.createOne(reviewModel);

// @desc    get spesific review
// @route   put  /api/v1/reviews/:id
// @access  Public/Protect
exports.getReview = factory.getOne(reviewModel);

// @desc    update spesific review
// @route   put /api/v1/categories/:id
// @access  Public/Protect/User
exports.updateReview = factory.updateOnde(reviewModel);

// @desc     delete spesific review
// @route    delete /api/v1/categories/:id
// @access   Public/Protect/User-Admin-Manager
exports.deleteReview = factory.deleteOne(reviewModel);
