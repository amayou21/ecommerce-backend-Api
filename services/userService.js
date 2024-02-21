const userModel = require("../models/useModel");
const factory = require("./handleFactory");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const { uploadSingleImage } = require("../middleware/uploadImageMiddelware");
const bcrypt = require("bcryptjs");
const createToken = require("../utility/createToken");

exports.uploadImage = uploadSingleImage("profileImg")

exports.resizeImage = asyncHandler(async (req, res, next) => {
    const fileName = `user-${uuidv4()}-${Date.now()}.jpeg`;
    // console.log(req);
    if (req.file) {
        await sharp(req.file.buffer)
            .resize(900, 900)
            .toFormat("jpeg")
            .jpeg({ quality: 100 })
            .toFile(`uploads/users/${fileName}`);
        // console.log(res.errored);
        req.body.profileImg = fileName;
    }

    next();
});

// @desc    get list of users
// @route   get api/v1//users
// @access  Private
exports.getUsers = factory.getAll(userModel);

// @desc    create user
// @route   post apiv/users
// @access  Private
exports.createUser = factory.createOne(userModel);

// @desc    get spesific user
// @route   put  /api/v1/users/:id
// @access  Private
exports.getUser = factory.getOne(userModel);

// @desc    update spesific user
// @route   put /api/v1/users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
    const documeent = await userModel.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            slug: req.body.slug,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
            profileImg: req.body.profileImg
        },
        { new: true }
    );
    !documeent
        ? next(new ApiError(`no documeent with this id : ${req.params.id}`, 400))
        : res.status(200).json(documeent);
});


// @desc    updateg use password
// @route   put /api/v1/changepassword/:id
// @access  Private
exports.updatePassWord = asyncHandler(async (req, res, next) => {
    const documeent = await userModel.findByIdAndUpdate(req.params.id, {
        password: await bcrypt.hash(req.body.password, 12),
        passwordChangedAT: Date.now()
    }, { new: true })
    !documeent
        ? next(new ApiError(`no documeent with this id : ${req.params.id}`, 400))
        : res.status(200).json(documeent);
})

// @desc     delete spesific user
// @route    delete /api/v1/users/:id
// @access   Private
exports.deleteUser = factory.deleteOne(userModel);



// @desc     get logged user
// @route    get /api/v1/users/getMe
// @access   Private/Protect
exports.getLoggedUser = asyncHandler(async (req, res, next) => {
    req.params.id = req.user._id
    next()
})



// @desc     update logged user password
// @route    PUT /api/v1/users/updateMyPassword
// @access   Private/Protect
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {

    // 1)
    const user = await userModel.findByIdAndUpdate(
        req.user._id, {
        password: await bcrypt.hash(req.body.password, 12),
        passwordChangedAT: Date.now()
    }, { new: true })

    // 2) generate token

    const token = createToken({ userID: user._id, email: user.email })
    res.status(200).json({ token })
})


// @desc     update logged user data
// @route    PUT /api/v1/users/updateMyData
// @access   Private/Protect
exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndUpdate(
        req.user._id, {
        name: req.body.name,
        phone: req.body.phone,
        slug: req.body.slug,
        email: req.body.email,
    },
        {
            new: true
        })

    res.status(200).json({ data: user })
})


// @desc     delete logged user
// @route    get /api/v1/users/deleteMe
// @access   Private/Protect
exports.deleteMe = asyncHandler(async (req, res, next) => {
    await userModel.findByIdAndUpdate(req.user._id, {
        active: false
    })
    res.status(204).json({ status: 'success' })
})