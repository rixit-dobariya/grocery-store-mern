import express from "express";
const router = express.Router();
import {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
    replyToReview
} from "../controllers/review.controller.js";

router.post("/", createReview);
router.get("/", getReviews);
router.get("/:id", getReviewById);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

router.put("/:id/reply", replyToReview);

export default router;
