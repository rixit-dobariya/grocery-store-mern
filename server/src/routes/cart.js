import express from "express";
const router = express.Router();
import {
    addToCart,
    getCartByUserId,
    updateCartItem,
    removeCartItem,
    clearCart
} from "../controllers/cart.controller.js";

router.post("/", addToCart);
router.get("/:userId", getCartByUserId);
router.put("/:userId", updateCartItem);
router.delete("/:userId", removeCartItem);
router.delete("/clear/:userId", clearCart);

export default router;
