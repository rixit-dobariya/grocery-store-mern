import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import cartService from "../services/cart.service.js";

export const addToCart = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const cart = await cartService.addToCart(userId, productId, quantity);
  res.status(201).json(cart);
});

export const getCartByUserId = asyncHandler(async (req, res) => {
  const cart = await cartService.getCartByUserId(req.params.userId);
  res.status(200).json(cart);
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await cartService.updateCartItem(req.params.userId, productId, quantity);
  res.status(200).json(cart);
});

export const removeCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const cart = await cartService.removeCartItem(req.params.userId, productId);
  res.status(200).json(cart);
});

export const clearCart = asyncHandler(async (req, res) => {
  const result = await cartService.clearCart(req.params.userId);
  res.status(200).json(result);
});
