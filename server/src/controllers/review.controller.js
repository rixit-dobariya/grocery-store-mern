import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import reviewService from "../services/review.service.js";

// CREATE a new review
export const createReview = asyncHandler(async (req, res) => {
  const savedReview = await reviewService.createReview(req.body);
  res.status(201).json(savedReview);
});

// READ all reviews or by filters (optional: productId/userId)
export const getReviews = asyncHandler(async (req, res) => {
  const reviews = await reviewService.getReviews(req.query);
  res.status(200).json(reviews);
});

// READ a single review by ID
export const getReviewById = asyncHandler(async (req, res) => {
  const review = await reviewService.getReviewById(req.params.id);
  res.status(200).json(review);
});

// UPDATE a review (admin can reply or update fields)
export const updateReview = asyncHandler(async (req, res) => {
  const updatedReview = await reviewService.updateReview(req.params.id, req.body);
  res.status(200).json(updatedReview);
});

// DELETE a review
export const deleteReview = asyncHandler(async (req, res) => {
  const result = await reviewService.deleteReview(req.params.id);
  res.status(200).json(result);
});

// REPLY to a review (Admin only)
export const replyToReview = asyncHandler(async (req, res) => {
  const updatedReview = await reviewService.replyToReview(req.params.id, req.body.reply);
  res.status(200).json(updatedReview);
});
