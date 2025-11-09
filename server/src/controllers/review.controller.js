const asyncHandler = require("../utils/asyncHandler");
const {
    createReviewService,
    getReviewsService,
    getReviewByIdService,
    updateReviewService,
    deleteReviewService,
    replyToReviewService,
} = require("../services/review.service");

// Create review
const createReview = asyncHandler(async (req, res) => {
    const review = await createReviewService(req.body);
    res.status(201).json({
        success: true,
        message: "Review created successfully.",
        data: review,
    });
});

// Get reviews (with optional filters)
const getReviews = asyncHandler(async (req, res) => {
    const reviews = await getReviewsService(req.query);
    res.status(200).json({
        success: true,
        message: "Reviews fetched successfully.",
        data: reviews,
    });
});

// Get single review
const getReviewById = asyncHandler(async (req, res) => {
    const review = await getReviewByIdService(req.params.id);
    res.status(200).json({
        success: true,
        message: "Review fetched successfully.",
        data: review,
    });
});

// Update review
const updateReview = asyncHandler(async (req, res) => {
    const review = await updateReviewService(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: "Review updated successfully.",
        data: review,
    });
});

// Delete review
const deleteReview = asyncHandler(async (req, res) => {
    const result = await deleteReviewService(req.params.id);
    res.status(200).json({
        success: true,
        message: result.message,
    });
});

// Reply to review (admin)
const replyToReview = asyncHandler(async (req, res) => {
    const review = await replyToReviewService(req.params.id, req.body.reply);
    res.status(200).json({
        success: true,
        message: "Reply added successfully.",
        data: review,
    });
});

module.exports = {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
    replyToReview,
};
