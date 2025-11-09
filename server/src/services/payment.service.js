const Razorpay = require("razorpay");
const AppError = require("../utils/AppError");

// Razorpay instance
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
exports.createPaymentOrderService = async (amount) => {
    if (!amount || isNaN(amount) || amount <= 0) {
        throw new AppError("Invalid amount provided", 400);
    }

    const options = {
        amount: Math.round(amount * 100), // convert to paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    };

    try {
        const order = await razorpayInstance.orders.create(options);
        return order;
    } catch (error) {
        throw new AppError(`Razorpay order creation failed: ${error.message}`, 502);
    }
};
