const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const asyncHandler = require("../utils/asyncHandler");

router.post("/", asyncHandler(cartController.addToCart));
router.get("/:userId", asyncHandler(cartController.getCartByUserId));
router.put("/:userId", asyncHandler(cartController.updateCartItem));
router.delete("/:userId", asyncHandler(cartController.removeCartItem));
router.delete("/clear/:userId", asyncHandler(cartController.clearCart));

module.exports = router;
