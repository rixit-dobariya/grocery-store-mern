const express = require("express");
const router = express.Router();
const addressController = require("../controllers/address.controller");
const asyncHandler = require("../utils/asyncHandler");

router.post("/", asyncHandler(addressController.addAddress));
router.get("/:addressId", asyncHandler(addressController.getAddressById));
router.get("/user/:userId", asyncHandler(addressController.getAddressesByUserId));
router.put("/:addressId", asyncHandler(addressController.updateAddress));

module.exports = router;
