import express from 'express';
const router = express.Router();
import {
    addOrder,
    updateOrder,
    checkout,
    getOrders,
    markOrderAsDeleted,
    getActiveOrders,
    getOrderById,
    hasUserPurchasedProduct,
    getOrdersByUserId,
    checkStockAvailability
} from '../controllers/order.controller.js';

// Add an order
router.post('/', addOrder);
router.put('/:orderId', updateOrder);
router.post('/checkout', checkout);

// Get multiple orders (with optional deleted status filter)
router.get('/', getOrders);

// Mark an order as deleted
router.patch('/:orderId/delete', markOrderAsDeleted);

// Get only non-deleted orders
router.get('/active', getActiveOrders);

// Get a single order by ID
router.get('/:orderId', getOrderById);
router.get("/has-purchased/:userId/:productId", hasUserPurchasedProduct);

router.get("/user/:userId", getOrdersByUserId);
router.get("/check-stock/:userId", checkStockAvailability);

export default router;
