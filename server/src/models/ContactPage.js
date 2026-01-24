import mongoose from "mongoose";

const ContactPageSchema = new mongoose.Schema({
  contactEmail: { type: String, required: true },
  contactNumber: { type: String, required: true }
});

export default mongoose.model("ContactPage", ContactPageSchema);
