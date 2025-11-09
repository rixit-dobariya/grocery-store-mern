const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Offer = require("../models/Offer");
const AppError = require("../utils/AppError");

// Utility: check if offer is currently active
const isActive = (start, end) => {
    const now = new Date();
    return new Date(start) <= now && now <= new Date(end);
};

// Check stock availability for a given user
exports.checkStockAvailabilityService = async (userId) => {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
        throw new AppError("Cart is empty or not found", 400);
    }

    for (const item of cart.items) {
        const product = item.productId;
        if (!product || (product.stock || 0) < item.quantity) {
            throw new AppError(
                `${product?.productName || "Product"} doesn't have enough stock (required: ${item.quantity}, available: ${product.stock || 0}).`,
                400
            );
        }
    }

    return { message: "All products are available in sufficient quantity" };
};

// Checkout service
exports.checkoutService = async (body) => {
    const { userId, addressId, promoCodeId, razorpayOrderId, razorpayPaymentId } = body;

    // 1️⃣ Fetch cart
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) throw new AppError("Cart is empty or not found", 400);

    // 2️⃣ Calculate subtotal
    let subtotal = 0;
    cart.items.forEach((item) => {
        subtotal +=
            (item.productId.salePrice -
                item.productId.salePrice * (item.productId.discount / 100)) *
            item.quantity;
    });

    // 3️⃣ Apply offer if present
    let discountAmount = 0;
    let discountPerProduct = {};
    if (promoCodeId) {
        const offer = await Offer.findById(promoCodeId);
        if (!offer || !isActive(offer.startDate, offer.endDate)) {
            throw new AppError("Invalid or inactive promo code", 400);
        }

        if (subtotal >= offer.minimumOrder) {
            const rawDiscount = subtotal * (offer.discount / 100);
            discountAmount = Math.min(rawDiscount, offer.maxDiscount);

            const totalBase = subtotal;
            cart.items.forEach((item) => {
                const productTotal =
                    (item.productId.salePrice -
                        item.productId.salePrice * (item.productId.discount / 100)) *
                    item.quantity;
                const productDiscount = (productTotal / totalBase) * discountAmount;
                discountPerProduct[item.productId._id.toString()] = productDiscount;
            });
        }
    }

    // 4️⃣ Create order
    const shippingCharge = 50;
    const totalAmount = subtotal - discountAmount + shippingCharge;

    const newOrder = await Order.create({
        userId,
        delAddressId: addressId,
        orderDate: new Date(),
        orderStatus: "Pending",
        shippingCharge,
        total: totalAmount,
        paymentMode: "Online",
        paymentStatus: "Completed",
        razorpayOrderId,
        razorpayPaymentId,
        offerId: promoCodeId,
    });

    // 5️⃣ Create OrderItems
    const orderItems = cart.items.map((item) => {
        const productId = item.productId._id;
        const quantity = item.quantity;
        const price =
            item.productId.salePrice - item.productId.salePrice * (item.productId.discount / 100);
        const discount = discountPerProduct[productId.toString()] || 0;

        return {
            orderId: newOrder._id,
            productId,
            quantity,
            price,
            discount,
        };
    });

    await OrderItem.insertMany(orderItems);

    // 6️⃣ Update product stock
    for (const item of cart.items) {
        const product = item.productId;
        product.stock = Math.max(0, (product.stock || 0) - item.quantity);
        await product.save();
    }

    // 7️⃣ Clear cart
    cart.items = [];
    await cart.save();

    return newOrder;
};

// Create new order manually (not from cart)
exports.addOrderService = async (payload) => {
    const {
        userId,
        orderDate = new Date(),
        orderStatus = "Pending",
        delAddressId,
        shippingCharge = 0,
        products,
        paymentMode = "Cash on Delivery",
    } = payload;

    if (!products || !Array.isArray(products) || products.length === 0)
        throw new AppError("At least one product is required", 400);

    // Compute total and validate products
    let totalAmount = 0;
    const orderItems = [];

    for (const product of products) {
        const foundProduct = await Product.findById(product.productId);
        if (!foundProduct)
            throw new AppError(`Product with id ${product.productId} not found`, 400);

        const price =
            foundProduct.salePrice - (foundProduct.salePrice * (foundProduct.discount || 0)) / 100;
        totalAmount += price * product.quantity;

        orderItems.push({
            productId: product.productId,
            quantity: product.quantity,
            price,
            discount: foundProduct.discount || 0,
        });
    }

    // Create order
    const newOrder = await Order.create({
        userId,
        orderDate,
        orderStatus,
        delAddressId,
        shippingCharge,
        total: totalAmount + parseFloat(shippingCharge),
        paymentMode,
        paymentStatus: paymentMode === "Online" ? "Completed" : "Pending",
    });

    // Attach orderId and save items
    const itemsToInsert = orderItems.map((item) => ({
        ...item,
        orderId: newOrder._id,
    }));
    await OrderItem.insertMany(itemsToInsert);

    return newOrder;
};

// Update existing order and replace items
exports.updateOrderService = async (orderId, payload) => {
    const {
        userId,
        orderDate,
        orderStatus,
        delAddressId,
        shippingCharge = 0,
        products,
        paymentMode,
    } = payload;

    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) throw new AppError("Order not found", 404);

    if (!products || !Array.isArray(products) || products.length === 0)
        throw new AppError("At least one product is required", 400);

    // Calculate total and rebuild items
    let totalAmount = 0;
    const newOrderItems = [];

    for (const product of products) {
        const foundProduct = await Product.findById(product.productId);
        if (!foundProduct)
            throw new AppError(`Product with id ${product.productId} not found`, 400);

        const price =
            foundProduct.salePrice - (foundProduct.salePrice * (foundProduct.discount || 0)) / 100;
        totalAmount += price * product.quantity;

        newOrderItems.push({
            productId: product.productId,
            quantity: product.quantity,
            price,
            discount: foundProduct.discount || 0,
        });
    }

    // Update order fields
    existingOrder.userId = userId || existingOrder.userId;
    existingOrder.orderDate = orderDate || existingOrder.orderDate;
    existingOrder.orderStatus = orderStatus || existingOrder.orderStatus;
    existingOrder.delAddressId = delAddressId || existingOrder.delAddressId;
    existingOrder.shippingCharge = shippingCharge;
    existingOrder.total = totalAmount + parseFloat(shippingCharge);
    existingOrder.paymentMode = paymentMode || existingOrder.paymentMode;

    const updatedOrder = await existingOrder.save();

    // Replace items atomically
    await OrderItem.deleteMany({ orderId: updatedOrder._id });
    const itemsToInsert = newOrderItems.map((it) => ({
        ...it,
        orderId: updatedOrder._id,
    }));
    await OrderItem.insertMany(itemsToInsert);

    return updatedOrder;
};

// Fetch multiple orders with optional deleted filter
exports.getOrdersService = async (includeDeleted = "false") => {
    const filter = includeDeleted === "true" ? {} : { isDeleted: false };

    const orders = await Order.find(filter)
        .populate("userId", "name email")
        .populate("delAddressId", "street city state zipCode")
        .exec();

    return orders;
};

// Mark order as deleted (soft delete)
exports.markOrderAsDeletedService = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) throw new AppError("Order not found", 404);

    order.isDeleted = true;
    await order.save();

    return order;
};

// Fetch only non-deleted (active) orders
exports.getActiveOrdersService = async () => {
    const activeOrders = await Order.find({ isDeleted: false })
        .populate("userId")
        .populate("delAddressId", "street city state zipCode")
        .exec();

    return activeOrders;
};

// Fetch single order by ID (with items, address, user)
exports.getOrderByIdService = async (orderId) => {
    const order = await Order.findById(orderId)
        .populate("userId")
        .populate("delAddressId")
        .populate("offerId");

    if (!order) throw new AppError("Order not found", 404);

    const orderItems = await OrderItem.find({ orderId })
        .populate("productId", "productName productImage")
        .select("-orderId -_id");

    if (!orderItems || orderItems.length === 0)
        throw new AppError("No order items found for this order", 404);

    return { order, orderItems };
};

// Check if a user has purchased a specific product
exports.hasUserPurchasedProductService = async (userId, productId) => {
    const userOrders = await Order.find({ userId, isDeleted: false }).select("_id");

    if (!userOrders || userOrders.length === 0) return false;

    const orderItem = await OrderItem.findOne({
        orderId: { $in: userOrders.map((o) => o._id) },
        productId,
    });

    return !!orderItem;
};

// Fetch all orders for a specific user
exports.getOrdersByUserIdService = async (userId) => {
    const orders = await Order.find({ userId, isDeleted: false })
        .populate("delAddressId")
        .sort({ orderDate: -1 });

    return orders;
};
