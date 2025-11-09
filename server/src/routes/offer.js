const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offer.controller");
const asyncHandler = require("../utils/asyncHandler");

router.post("/", asyncHandler(offerController.createOffer));
router.get("/", asyncHandler(offerController.getAllOffers));
router.get("/:id", asyncHandler(offerController.getOfferById));
router.put("/:id", asyncHandler(offerController.updateOffer));
router.delete("/:id", asyncHandler(offerController.deleteOffer));

module.exports = router;
