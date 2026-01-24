import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import wishlistService from "../services/wishlist.service.js";

// Add product to the user's wishlist
export const addToWishlist = asyncHandler(async (req, res) => {
  const result = await wishlistService.addToWishlist(req.params.userId, req.body.productId);
  res.status(200).json(result);
});

// Remove product from the user's wishlist
export const removeFromWishlist = asyncHandler(async (req, res) => {
  const result = await wishlistService.removeFromWishlist(req.params.userId, req.body.productId);
  res.status(200).json(result);
});

// Get the user's wishlist
export const getWishlist = asyncHandler(async (req, res) => {
  const result = await wishlistService.getWishlist(req.params.userId);
  res.status(200).json(result);
});
