const asyncHandler = require("../utils/asyncHandler");
const {
    checkStockAvailabilityService,
    checkoutService,
    addOrderService,
    updateOrderService,
    getOrdersService,
    markOrderAsDeletedService,
    getActiveOrdersService,
    getOrderByIdService,
    hasUserPurchasedProductService,
    getOrdersByUserIdService,
} = require("../services/order.service");

// Check stock availability
const checkStockAvailability = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const result = await checkStockAvailabilityService(userId);
    res.status(200).json({
        success: true,
        message: result.message,
    });
});

// Checkout
const checkout = asyncHandler(async (req, res) => {
    const order = await checkoutService(req.body);
    res.status(201).json({
        success: true,
        message: "Checkout completed successfully",
        data: order,
    });
});

// Add new order
const addOrder = asyncHandler(async (req, res) => {
    const order = await addOrderService(req.body);
    res.status(201).json({
        success: true,
        message: "Order created successfully.",
        data: order,
    });
});

// Update order
const updateOrder = asyncHandler(async (req, res) => {
    const updatedOrder = await updateOrderService(req.params.orderId, req.body);
    res.status(200).json({
        success: true,
        message: "Order updated successfully.",
        data: updatedOrder,
    });
});

// Get all orders (with deleted filter)
const getOrders = asyncHandler(async (req, res) => {
    const orders = await getOrdersService(req.query.includeDeleted);
    res.status(200).json({ orders });
});

// Mark order as deleted (soft delete)
const markOrderAsDeleted = asyncHandler(async (req, res) => {
    const order = await markOrderAsDeletedService(req.params.orderId);
    res.status(200).json({
        message: "Order marked as deleted successfully.",
    });
});

// Get only active (non-deleted) orders
const getActiveOrders = asyncHandler(async (req, res) => {
    const activeOrders = await getActiveOrdersService();
    res.status(200).json({
        orders: activeOrders,
    });
});

// Get a single order by ID (with items and relations)
const getOrderById = asyncHandler(async (req, res) => {
    const result = await getOrderByIdService(req.params.orderId);
    res.status(200).json(result);
});

// Check if a user has purchased a specific product
const hasUserPurchasedProduct = asyncHandler(async (req, res) => {
    const { userId, productId } = req.params;
    const purchased = await hasUserPurchasedProductService(userId, productId);
    res.status(200).json({
        purchased,
    });
});

// Get orders by userId
const getOrdersByUserId = asyncHandler(async (req, res) => {
    const orders = await getOrdersByUserIdService(req.params.userId);
    res.status(200).json({ orders });
});

module.exports = {
    checkStockAvailability,
    checkout,
    addOrder,
    updateOrder,
    getOrders,
    markOrderAsDeleted,
    getActiveOrders,
    getOrderById,
    hasUserPurchasedProduct,
    getOrdersByUserId,
};
