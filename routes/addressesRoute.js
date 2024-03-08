const express = require("express");

const { getLoggedUserAddress, addUserAddress, removeUserAddress, removeAllUserAddress } = require("../services/addressesService");

const { protect, allowTo } = require("../services/authService");
const { addUserAddressValidator, removeUserAddressValidator } = require("../utility/validators/addressesValidator");

const router = express.Router();

router.use(protect, allowTo("user"))

router.route("/").get(getLoggedUserAddress).post(addUserAddressValidator, addUserAddress).delete(removeAllUserAddress);

router.route("/:addressID").delete(removeUserAddressValidator, removeUserAddress);


module.exports = router;