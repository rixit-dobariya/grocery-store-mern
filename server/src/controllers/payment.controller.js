import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import paymentService from "../services/payment.service.js";

export const createOrder = asyncHandler(async (req, res) => {
  const result = await paymentService.createOrder(req.body.amount);
  res.status(200).json(result);
});
