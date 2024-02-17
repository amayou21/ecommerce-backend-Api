const express = require("express");

const {
    createUserValidator,
    getSpesificUserValidator,
    updateUserValidator,
    deleteUserValidator,
    changeUserPasswordValidator,

} = require("../utility/validators/userValidator");

const {
    getUser,
    createUser,
    getUsers,
    updateUser,
    updatePassWord,
    deleteUser,
    resizeImage,
    uploadImage,
} = require("../services/userService");

const router = express.Router();

router.route("/").get(getUsers).post(uploadImage, resizeImage, createUserValidator, createUser);

router
    .route("/:id")
    .get(getSpesificUserValidator, getUser)
    .put(uploadImage, resizeImage, updateUserValidator, updateUser)
    .delete(deleteUserValidator, deleteUser);

router.route("/changepassword/:id").put(changeUserPasswordValidator, updatePassWord)
module.exports = router;
