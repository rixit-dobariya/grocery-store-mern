const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/payment.controller.js");
const asyncHandler = require("../utils/asyncHandler");

router.post("/create-order", asyncHandler(createOrder));

module.exports = router;
