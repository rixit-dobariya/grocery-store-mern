const Review = require("../models/Review");
const AppError = require("../utils/AppError");

// Create a new review
exports.createReviewService = async (data) => {
    if (!data.productId || !data.userId || !data.rating)
        throw new AppError("Missing required fields: productId, userId, rating", 400);

    const newReview = await Review.create(data);
    return newReview;
};

// Get all reviews or filtered by product/user
exports.getReviewsService = async (query) => {
    const { productId, userId } = query;
    const filter = {};
    if (productId) filter.productId = productId;
    if (userId) filter.userId = userId;

    const reviews = await Review.find(filter)
        .populate("productId", "productName productImage")
        .populate("userId", "firstName lastName email profilePicture");

    return reviews;
};

// Get a single review by ID
exports.getReviewByIdService = async (id) => {
    const review = await Review.findById(id)
        .populate("productId", "productName productImage")
        .populate("userId", "firstName lastName email");

    if (!review) throw new AppError("Review not found", 404);
    return review;
};

// Update a review (user or admin)
exports.updateReviewService = async (id, body) => {
    const updateData = { $set: body };
    if (body.reply) updateData.$set.replyDate = new Date();

    const updated = await Review.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) throw new AppError("Review not found", 404);

    return updated;
};

// Delete a review
exports.deleteReviewService = async (id) => {
    const deleted = await Review.findByIdAndDelete(id);
    if (!deleted) throw new AppError("Review not found", 404);
    return { message: "Review deleted successfully" };
};

// Admin reply to a review
exports.replyToReviewService = async (id, reply) => {
    if (!reply || reply.trim() === "") throw new AppError("Reply cannot be empty", 400);

    const updated = await Review.findByIdAndUpdate(
        id,
        { $set: { reply, replyDate: new Date() } },
        { new: true }
    );

    if (!updated) throw new AppError("Review not found", 404);
    return updated;
};
