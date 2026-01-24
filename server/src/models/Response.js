import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  reply: { type: String, required: false } // Optional, may or may not have a reply
});

export default mongoose.model("Response", ResponseSchema);
