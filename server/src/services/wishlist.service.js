const UserWishlist = require("../models/Wishlist");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");

// 🔹 Add product to wishlist
exports.addToWishlistService = async (userId, productId) => {
  const product = await Product.findById(productId);
  if (!product) throw new AppError("Product not found", 404);

  let wishlist = await UserWishlist.findOne({ userId });

  if (!wishlist) {
    wishlist = await UserWishlist.create({ userId, productIds: [productId] });
  } else {
    if (wishlist.productIds.includes(productId)) {
      throw new AppError("Product already in wishlist", 400);
    }
    wishlist.productIds.push(productId);
    await wishlist.save();
  }

  return { message: "Product added to wishlist", wishlist };
};

// 🔹 Remove product from wishlist
exports.removeFromWishlistService = async (userId, productId) => {
  const wishlist = await UserWishlist.findOne({ userId });
  if (!wishlist) throw new AppError("Wishlist not found", 404);

  const index = wishlist.productIds.indexOf(productId);
  if (index === -1) throw new AppError("Product not in wishlist", 400);

  wishlist.productIds.splice(index, 1);
  await wishlist.save();

  return { message: "Product removed from wishlist", wishlist };
};

// 🔹 Get user's wishlist
exports.getWishlistService = async (userId) => {
  const wishlist = await UserWishlist.findOne({ userId }).populate("productIds");
  if (!wishlist) throw new AppError("Wishlist not found", 404);

  return wishlist;
};
