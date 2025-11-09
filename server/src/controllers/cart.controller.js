const asyncHandler = require("../utils/asyncHandler");
const {
    addToCartService,
    getCartByUserIdService,
    updateCartItemService,
    removeCartItemService,
    clearCartService,
} = require("../services/cart.service");

const addToCart = asyncHandler(async (req, res) => {
    const { userId, productId, quantity } = req.body;
    const cart = await addToCartService(userId, productId, quantity);
    res.status(201).json(cart);
});

const getCartByUserId = asyncHandler(async (req, res) => {
    const cart = await getCartByUserIdService(req.params.userId);
    res.status(200).json(cart);
});

const updateCartItem = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const cart = await updateCartItemService(req.params.userId, productId, quantity);
    res.status(200).json(cart);
});

const removeCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const cart = await removeCartItemService(req.params.userId, productId);
    res.status(200).json(cart);
});

const clearCart = asyncHandler(async (req, res) => {
    await clearCartService(req.params.userId);
    res.status(200).json({
        success: true,
        message: "Cart cleared successfully",
    });
});

module.exports = {
    addToCart,
    getCartByUserId,
    updateCartItem,
    removeCartItem,
    clearCart,
};
