import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import Offer from "../models/Offer.js";
import { ApiError } from "../utils/ApiError.js";

class OrderService {
    async checkStockAvailability(userId) {
        const cart = await Cart.findOne({ userId }).populate("items.productId");

        if (!cart || cart.items.length === 0) {
            throw new ApiError(400, "Cart is empty or not found.");
        }

        for (const item of cart.items) {
            const product = item.productId;
            if (!product || (product.stock || 0) < item.quantity) {
                throw new ApiError(400, `${product.productName}'s ${item.quantity} quantity is not available in stock.`);
            }
        }

        return { message: "All products are available in sufficient quantity." };
    }

    isActive(start, end) {
        const now = new Date();
        return new Date(start) <= now && now <= new Date(end);
    }

    async checkout(userId, addressId, promoCodeId, razorpayOrderId, razorpayPaymentId) {
        // 1. Get cart
        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if (!cart || cart.items.length === 0) {
            throw new ApiError(400, "Cart is empty or not found.");
        }

        // 2. Calculate subtotal
        let subtotal = 0;
        cart.items.forEach(item => {
            subtotal += (item.productId.salePrice - item.productId.salePrice * item.productId.discount / 100) * item.quantity;
        });

        // 3. Apply discount
        let discountAmount = 0;
        let discountPerProduct = {};
        if (promoCodeId) {
            const offer = await Offer.findById(promoCodeId);
            if (!offer || !this.isActive(offer.startDate, offer.endDate)) {
                throw new ApiError(400, "Invalid or inactive promo code.");
            }

            if (subtotal >= offer.minimumOrder) {
                const rawDiscount = subtotal * (offer.discount / 100);
                discountAmount = Math.min(rawDiscount, offer.maxDiscount);

                let totalBase = subtotal;
                cart.items.forEach(item => {
                    const productTotal = (item.productId.salePrice - item.productId.salePrice * item.productId.discount / 100) * item.quantity;
                    const productDiscount = (productTotal / totalBase) * discountAmount;
                    discountPerProduct[item.productId._id.toString()] = productDiscount;
                });
            }
        }

        // 4. Create order
        const shippingCharge = 50;
        const totalAmount = subtotal - discountAmount + shippingCharge;

        const newOrder = new Order({
            userId,
            delAddressId: addressId,
            orderDate: new Date(),
            orderStatus: "Pending",
            shippingCharge,
            total: totalAmount,
            paymentMode: "Online",
            paymentStatus: "Completed",
            razorpayOrderId: razorpayOrderId,
            razorpayPaymentId: razorpayPaymentId,
            offerId: promoCodeId,
        });

        const savedOrder = await newOrder.save();

        // 5. Create OrderItems
        const orderItems = cart.items.map(item => {
            const productId = item.productId._id;
            const quantity = item.quantity;
            const price = (item.productId.salePrice - item.productId.salePrice * item.productId.discount / 100);
            const discount = discountPerProduct[productId.toString()] || 0;

            return {
                orderId: savedOrder._id,
                productId,
                quantity,
                price,
                discount,
            };
        });

        await OrderItem.insertMany(orderItems);

        for (const item of cart.items) {
            const product = item.productId;
            product.stock = Math.max(0, (product.stock || 0) - item.quantity);
            await product.save();
        }

        cart.items = [];
        await cart.save();

        return { message: "Checkout completed successfully.", order: savedOrder };
    }

    async addOrder(userId, orderData) {
        const { orderDate, orderStatus, delAddressId, shippingCharge, products, paymentMode } = orderData;

        if (!products || products.length === 0) {
            throw new ApiError(400, "At least one product is required.");
        }

        let totalAmount = 0;
        for (let product of products) {
            const { productId, quantity } = product;
            const foundProduct = await Product.findById(productId);

            if (!foundProduct) {
                throw new ApiError(400, `Product with id ${productId} not found.`);
            }

            totalAmount += (foundProduct.salePrice - (foundProduct.salePrice * foundProduct.discount / 100)) * quantity;
        }

        const newOrder = new Order({
            userId,
            orderDate,
            orderStatus: orderStatus || "Pending",
            delAddressId,
            shippingCharge,
            total: totalAmount + parseFloat(shippingCharge),
            paymentMode: paymentMode || "Cash on Delivery",
            paymentStatus: "Pending",
        });

        const savedOrder = await newOrder.save();

        const orderItems = await Promise.all(
            products.map(async (product) => {
                const foundProduct = await Product.findById(product.productId);
                return {
                    orderId: savedOrder._id,
                    productId: product.productId,
                    quantity: product.quantity,
                    price: foundProduct.salePrice,
                };
            })
        );

        await OrderItem.insertMany(orderItems);
        return { message: "Order created successfully.", order: savedOrder };
    }

    async updateOrder(orderId, userId, orderData) {
        const { orderDate, orderStatus, delAddressId, shippingCharge, products, paymentMode } = orderData;

        const existingOrder = await Order.findById(orderId);
        if (!existingOrder) {
            throw new ApiError(404, "Order not found.");
        }

        if (!products || products.length === 0) {
            throw new ApiError(400, "At least one product is required.");
        }

        let totalAmount = 0;
        for (let product of products) {
            const { productId, quantity } = product;
            const foundProduct = await Product.findById(productId);
            if (!foundProduct) {
                throw new ApiError(400, `Product with id ${productId} not found.`);
            }
            totalAmount += (foundProduct.salePrice - (foundProduct.salePrice * foundProduct.discount / 100)) * quantity;
        }

        existingOrder.userId = userId;
        existingOrder.orderDate = orderDate;
        existingOrder.orderStatus = orderStatus || existingOrder.orderStatus;
        existingOrder.delAddressId = delAddressId;
        existingOrder.shippingCharge = shippingCharge;
        existingOrder.total = totalAmount + parseFloat(shippingCharge);
        existingOrder.paymentMode = paymentMode || existingOrder.paymentMode;

        const updatedOrder = await existingOrder.save();

        await OrderItem.deleteMany({ orderId });

        const orderItems = await Promise.all(
            products.map(async (product) => {
                const foundProduct = await Product.findById(product.productId);
                return {
                    orderId: updatedOrder._id,
                    productId: product.productId,
                    quantity: product.quantity,
                    price: foundProduct.salePrice,
                    discount: foundProduct.discount || 0,
                };
            })
        );

        await OrderItem.insertMany(orderItems);
        return { message: "Order updated successfully.", order: updatedOrder };
    }

    async getOrders(includeDeleted = "false") {
        const deletedFilter = includeDeleted === "true" ? {} : { isDeleted: false };
        const orders = await Order.find(deletedFilter)
            .populate("userId", "name email")
            .populate("delAddressId", "street city state zipCode")
            .populate({
                path: "products",
                populate: {
                    path: "productId",
                    select: "name price",
                },
            })
            .exec();
        return { orders };
    }

    async markOrderAsDeleted(orderId) {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new ApiError(404, "Order not found.");
        }
        order.isDeleted = true;
        await order.save();
        return { message: "Order marked as deleted." };
    }

    async getActiveOrders() {
        const activeOrders = await Order.find({ isDeleted: false })
            .populate("userId")
            .populate("delAddressId", "street city state zipCode")
            .exec();
        return { orders: activeOrders };
    }

    async getOrderById(orderId) {
        const order = await Order.findById(orderId)
            .populate("userId")
            .populate("delAddressId")
            .populate("offerId")
            .exec();

        if (!order) {
            throw new ApiError(404, "Order not found.");
        }

        const orderItems = await OrderItem.find({ orderId: orderId })
            .populate("productId", "productName productImage")
            .select("-orderId -_id")
            .exec();

        if (!orderItems || orderItems.length === 0) {
            throw new ApiError(404, "No order items found.");
        }

        return { order, orderItems };
    }

    async hasUserPurchasedProduct(userId, productId) {
        const userOrders = await Order.find({ userId, isDeleted: false }).select("_id");
        const orderIds = userOrders.map(order => order._id);

        if (orderIds.length === 0) {
            return { purchased: false };
        }

        const orderItem = await OrderItem.findOne({
            orderId: { $in: orderIds },
            productId: productId,
        });

        return { purchased: !!orderItem };
    }

    async getOrdersByUserId(userId) {
        const orders = await Order.find({ userId, isDeleted: false })
            .populate("delAddressId")
            .sort({ orderDate: -1 });
        return { orders };
    }
}

export default new OrderService();
