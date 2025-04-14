const mongoose = require("mongoose");

// Orders Schema
const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderDate: { type: Date, default: Date.now },
  orderStatus: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  },
  delAddressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
  shippingCharge: { type: mongoose.Schema.Types.Decimal128, default: 0 },
  total: { type: mongoose.Schema.Types.Decimal128, default: 0 },
  paymentMode: { type: String, default: "Cash on Delivery" },
  paymentStatus: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);