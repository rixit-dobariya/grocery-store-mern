import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import orderService from "../services/order.service.js";

// Check stock availability based on userId
export const checkStockAvailability = asyncHandler(async (req, res) => {
  const result = await orderService.checkStockAvailability(req.params.userId);
  res.status(200).json(result);
});

export const checkout = asyncHandler(async (req, res) => {
  const { userId, addressId, promoCodeId, razorpayOrderId, razorpayPaymentId } = req.body;
  const result = await orderService.checkout(userId, addressId, promoCodeId, razorpayOrderId, razorpayPaymentId);
  res.status(201).json(result);
});

// Add a new order with multiple products
export const addOrder = asyncHandler(async (req, res) => {
  const result = await orderService.addOrder(req.body.userId, req.body);
  res.status(201).json(result);
});

export const updateOrder = asyncHandler(async (req, res) => {
  const result = await orderService.updateOrder(req.params.orderId, req.body.userId, req.body);
  res.status(200).json(result);
});

// Fetch multiple orders (supporting filtering by deleted status)
export const getOrders = asyncHandler(async (req, res) => {
  const result = await orderService.getOrders(req.query.includeDeleted);
  res.status(200).json(result);
});

// Mark an order as deleted (soft delete)
export const markOrderAsDeleted = asyncHandler(async (req, res) => {
  const result = await orderService.markOrderAsDeleted(req.params.orderId);
  res.status(200).json(result);
});

// Fetch only non-deleted orders
export const getActiveOrders = asyncHandler(async (req, res) => {
  const result = await orderService.getActiveOrders();
  res.status(200).json(result);
});

// Fetch a single order by ID (include products and address)
export const getOrderById = asyncHandler(async (req, res) => {
  const result = await orderService.getOrderById(req.params.orderId);
  res.status(200).json(result);
});


export const hasUserPurchasedProduct = asyncHandler(async (req, res) => {
  const { userId, productId } = req.params;
  const result = await orderService.hasUserPurchasedProduct(userId, productId);
  res.status(200).json(result);
});

export const getOrdersByUserId = asyncHandler(async (req, res) => {
  const result = await orderService.getOrdersByUserId(req.params.userId);
  res.status(200).json(result);
});
