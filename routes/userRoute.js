const express = require("express");

const {
    createUserValidator,
    getSpesificUserValidator,
    updateUserValidator,
    deleteUserValidator,
    changeUserPasswordValidator,
    updateLoggedUserPasswordValidator,
    updateLoggedUserValidator,

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
    getLoggedUser,
    updateLoggedUserPassword,
    updateLoggedUserData,
    deleteMe,
} = require("../services/userService");

const { allowTo, protect } = require("../services/authService");

const router = express.Router();

router.use(protect)


router.route("/getMe").get(getLoggedUser, getUser)
router.route("/updateMyPassword").put(updateLoggedUserPasswordValidator, updateLoggedUserPassword)
router.route("/updateMyData").put(updateLoggedUserValidator, updateLoggedUserData)
router.route("/deleteMe").delete(deleteMe)

// Admin
router.route("/")
    .get(allowTo("admin", "manager"), getUsers)
    .post(allowTo("admin"), uploadImage, resizeImage, createUserValidator, createUser);

router
    .route("/:id")
    .get(allowTo("admin", "manager"), getSpesificUserValidator, getUser)
    .put(allowTo("admin", "manager"), uploadImage, resizeImage, updateUserValidator, updateUser)
    .delete(allowTo("admin"), deleteUserValidator, deleteUser);

router.route("/changepassword/:id").put(allowTo("admin"), changeUserPasswordValidator, updatePassWord)

module.exports = router;
