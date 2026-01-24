import Cart from "../models/Cart.js";
import { ApiError } from "../utils/ApiError.js";

class CartService {
    async addToCart(userId, productId, quantity) {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, quantity }] });
            await cart.save();
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex >= 0) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
            await cart.save();
        }

        return cart;
    }

    async getCartByUserId(userId) {
        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if (!cart) throw new ApiError(404, "Cart not found");
        return cart;
    }

    async updateCartItem(userId, productId, quantity) {
        const cart = await Cart.findOne({ userId });

        if (!cart) throw new ApiError(404, "Cart not found");

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex >= 0) {
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
            return cart;
        } else {
            throw new ApiError(404, "Product not in cart");
        }
    }

    async removeCartItem(userId, productId) {
        const cart = await Cart.findOne({ userId });

        if (!cart) throw new ApiError(404, "Cart not found");

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex >= 0) {
            cart.items.splice(itemIndex, 1);
            await cart.save();
            return cart;
        } else {
            throw new ApiError(404, "Product not in cart");
        }
    }

    async clearCart(userId) {
        const cart = await Cart.findOne({ userId });

        if (!cart) throw new ApiError(404, "Cart not found");

        cart.items = [];
        await cart.save();
        return { message: "Cart cleared successfully" };
    }
}

export default new CartService();
