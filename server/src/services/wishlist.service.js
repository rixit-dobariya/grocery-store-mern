import UserWishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";
import { ApiError } from "../utils/ApiError.js";

class WishlistService {
    async addToWishlist(userId, productId) {
        const product = await Product.findById(productId);
        if (!product) {
            throw new ApiError(404, "Product not found");
        }

        let wishlist = await UserWishlist.findOne({ userId });

        if (!wishlist) {
            wishlist = new UserWishlist({
                userId,
                productIds: [productId],
            });
        } else {
            if (!wishlist.productIds.includes(productId)) {
                wishlist.productIds.push(productId);
            } else {
                throw new ApiError(400, "Product already in wishlist");
            }
        }

        await wishlist.save();
        return { message: "Product added to wishlist", wishlist };
    }

    async removeFromWishlist(userId, productId) {
        const wishlist = await UserWishlist.findOne({ userId });

        if (!wishlist) {
            throw new ApiError(404, "Wishlist not found");
        }

        const productIndex = wishlist.productIds.indexOf(productId);
        if (productIndex > -1) {
            wishlist.productIds.splice(productIndex, 1);
            await wishlist.save();
            return { message: "Product removed from wishlist", wishlist };
        } else {
            throw new ApiError(400, "Product not in wishlist");
        }
    }

    async getWishlist(userId) {
        const wishlist = await UserWishlist.findOne({ userId }).populate('productIds');

        if (!wishlist) {
            throw new ApiError(404, "Wishlist not found");
        }

        return { wishlist };
    }
}

export default new WishlistService();
