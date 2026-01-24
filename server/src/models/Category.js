import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  image: { type: String, required: true },
  isDeleted: { type: Boolean, default: false } // status field for soft deletion
});

export default mongoose.model("Category", CategorySchema);
