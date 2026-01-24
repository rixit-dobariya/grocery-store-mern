import express from "express";
const router = express.Router();
import {
    createOffer,
    getAllOffers,
    getOfferById,
    updateOffer,
    deleteOffer
} from "../controllers/offer.controller.js";

router.post("/", createOffer);
router.get("/", getAllOffers);
router.get("/:id", getOfferById);
router.put("/:id", updateOffer);
router.delete("/:id", deleteOffer);

export default router;
