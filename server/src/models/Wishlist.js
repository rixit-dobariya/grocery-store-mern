import mongoose from "mongoose";

const UserWishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // Ensure only one wishlist per user
    },
    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      }
    ]
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

export default mongoose.model("UserWishlist", UserWishlistSchema);
