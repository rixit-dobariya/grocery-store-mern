const Cart = require("../models/Cart");
const AppError = require("../utils/AppError");

// Add item to cart
exports.addToCartService = async (userId, productId, quantity) => {
    if (!userId || !productId || !quantity) {
        throw new AppError("User ID, Product ID, and Quantity are required", 400);
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (itemIndex >= 0) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }
    }

    return await cart.save();
};

// Get cart by user ID
exports.getCartByUserIdService = async (userId) => {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) throw new AppError("Cart not found", 404);
    return cart;
};

// Update quantity of specific cart item
exports.updateCartItemService = async (userId, productId, quantity) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new AppError("Cart not found", 404);

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex < 0) throw new AppError("Product not in cart", 404);

    cart.items[itemIndex].quantity = quantity;
    return await cart.save();
};

// Remove specific item from cart
exports.removeCartItemService = async (userId, productId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new AppError("Cart not found", 404);

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex < 0) throw new AppError("Product not in cart", 404);

    cart.items.splice(itemIndex, 1);
    return await cart.save();
};

// Clear entire cart
exports.clearCartService = async (userId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new AppError("Cart not found", 404);

    cart.items = [];
    await cart.save();
    return true;
};
