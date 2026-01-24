import mongoose from "mongoose";

const AboutPageSchema = new mongoose.Schema({
  content: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("AboutPage", AboutPageSchema);
