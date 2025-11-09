const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");
const asyncHandler = require("../utils/asyncHandler");

router.post("/", asyncHandler(reviewController.createReview));
router.get("/", asyncHandler(reviewController.getReviews));
router.get("/:id", asyncHandler(reviewController.getReviewById));
router.put("/:id", asyncHandler(reviewController.updateReview));
router.delete("/:id", asyncHandler(reviewController.deleteReview));

router.put("/:id/reply", asyncHandler(reviewController.replyToReview));

module.exports = router;
