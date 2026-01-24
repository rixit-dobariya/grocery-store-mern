import Review from "../models/Review.js";
import { ApiError } from "../utils/ApiError.js";

class ReviewService {
    async createReview(reviewData) {
        const newReview = new Review(reviewData);
        return await newReview.save();
    }

    async getReviews(filter) {
        const query = {};
        if (filter.productId) query.productId = filter.productId;
        if (filter.userId) query.userId = filter.userId;

        return await Review.find(query)
            .populate("productId", "productName productImage")
            .populate("userId", "firstName lastName email profilePicture");
    }

    async getReviewById(id) {
        const review = await Review.findById(id)
            .populate("productId", "productName productImage")
            .populate("userId", "firstName lastName email");

        if (!review) throw new ApiError(404, "Review not found");

        return review;
    }

    async updateReview(id, updateData) {
        const updatedReview = await Review.findByIdAndUpdate(
            id,
            {
                $set: updateData,
                ...(updateData.reply && { replyDate: new Date() })
            },
            { new: true }
        );

        if (!updatedReview) throw new ApiError(404, "Review not found");

        return updatedReview;
    }

    async deleteReview(id) {
        const deleted = await Review.findByIdAndDelete(id);
        if (!deleted) throw new ApiError(404, "Review not found");

        return { message: "Review deleted successfully" };
    }

    async replyToReview(id, reply) {
        if (!reply || reply.trim() === "") {
            throw new ApiError(400, "Reply cannot be empty");
        }

        const updatedReview = await Review.findByIdAndUpdate(
            id,
            {
                $set: { reply, replyDate: new Date() },
            },
            { new: true }
        );

        if (!updatedReview) {
            throw new ApiError(404, "Review not found");
        }

        return updatedReview;
    }
}

export default new ReviewService();
