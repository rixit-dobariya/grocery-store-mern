const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller.js');
const asyncHandler = require("../utils/asyncHandler");

// Add an order
router.post('/', asyncHandler(orderController.addOrder));
router.put('/:orderId', asyncHandler(orderController.updateOrder));
router.post('/checkout', asyncHandler(orderController.checkout));

// Get multiple orders (with optional deleted status filter)
router.get('/', asyncHandler(orderController.getOrders));

// Mark an order as deleted
router.patch('/:orderId/delete', asyncHandler(orderController.markOrderAsDeleted));

// Get only non-deleted orders
router.get('/active', asyncHandler(orderController.getActiveOrders));

// Get a single order by ID
router.get('/:orderId', asyncHandler(orderController.getOrderById));
router.get("/has-purchased/:userId/:productId", asyncHandler(orderController.hasUserPurchasedProduct));
router.get("/user/:userId", asyncHandler(orderController.getOrdersByUserId));
router.get("/check-stock/:userId", asyncHandler(orderController.checkStockAvailability));

module.exports = router;
