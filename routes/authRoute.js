const express = require("express");

const {
    signUpValidator, loginValidator
} = require("../utility/validators/authValidator");

const {
    signUp, login
} = require("../services/authService");

const router = express.Router();

router.route("/signup").post(signUpValidator, signUp);

// router
//     .route("/:id")
//     .get(getSpesificUserValidator, getUser)
//     .put(uploadImage, resizeImage, updateUserValidator, updateUser)
//     .delete(deleteUserValidator, deleteUser);

router.route("/login").post(loginValidator, login)
module.exports = router;
