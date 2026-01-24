import Razorpay from "razorpay";
import config from "../config/index.js";
import { ApiError } from "../utils/ApiError.js";

const instance = new Razorpay({
    key_id: config.razorpay.keyId,
    key_secret: config.razorpay.keySecret,
});

class PaymentService {
    async createOrder(amount) {
        if (!amount) throw new ApiError(400, "Amount is required");

        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        try {
            const order = await instance.orders.create(options);
            return { success: true, order };
        } catch (error) {
            throw new ApiError(500, error.message);
        }
    }
}

export default new PaymentService();
