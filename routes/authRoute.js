const express = require("express");

const {
    signUpValidator, loginValidator, resetPasswordValidator, forgotPasswordValidator
} = require("../utility/validators/authValidator");

const {
    signUp, login, forgotPassword, verifyPassResetCode, resetPassword
} = require("../services/authService");

const router = express.Router();

router.route("/signup").post(signUpValidator, signUp);

// router
//     .route("/:id")
//     .get(getSpesificUserValidator, getUser)
//     .put(uploadImage, resizeImage, updateUserValidator, updateUser)
//     .delete(deleteUserValidator, deleteUser);

router.route("/login").post(loginValidator, login)
router.route("/forgotPassword").post(forgotPasswordValidator, forgotPassword)
router.route("/verifyPassResetCode").post(verifyPassResetCode)
router.route("/resetPassword").put(resetPasswordValidator, resetPassword)

module.exports = router;
