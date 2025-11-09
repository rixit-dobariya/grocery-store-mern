const asyncHandler = require("../utils/asyncHandler");
const {
  addToWishlistService,
  removeFromWishlistService,
  getWishlistService,
} = require("../services/wishlist.service");

// Add product to wishlist
const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const { userId } = req.params;

  const result = await addToWishlistService(userId, productId);
  res.status(200).json({
    success: true,
    message: result.message,
    data: result.wishlist,
  });
});

// Remove product from wishlist
const removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const { userId } = req.params;

  const result = await removeFromWishlistService(userId, productId);
  res.status(200).json({
    success: true,
    message: result.message,
    data: result.wishlist,
  });
});

// Get wishlist
const getWishlist = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const wishlist = await getWishlistService(userId);

  res.status(200).json({
    success: true,
    message: "Wishlist retrieved successfully",
    data: wishlist,
  });
});

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
