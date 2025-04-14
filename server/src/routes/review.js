const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");

router.post("/", reviewController.createReview);
router.get("/", reviewController.getReviews);
router.get("/:id", reviewController.getReviewById);
router.put("/:id", reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);

router.put("/:id/reply", reviewController.replyToReview);

module.exports = router;
