const asyncHandler = require("../utils/asyncHandler");
const { createPaymentOrderService } = require("../services/payment.service");

// Create a new Razorpay order
const createOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  const order = await createPaymentOrderService(amount);

  res.status(200).json({
    success: true,
    message: "Payment order created successfully.",
    data: order,
  });
});

module.exports = {
  createOrder,
};
