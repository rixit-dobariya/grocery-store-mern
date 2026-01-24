import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema({
  offerCode: { type: String, required: true },
  offerDescription: { type: String, required: true },
  discount: { type: Number, required: true },
  maxDiscount: { type: Number, required: true },
  minimumOrder: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

export default mongoose.model("Offer", OfferSchema);
