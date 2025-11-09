const asyncHandler = require("../utils/asyncHandler");
const {
    createOfferService,
    getAllOffersService,
    getOfferByIdService,
    updateOfferService,
    deleteOfferService,
} = require("../services/offer.service");

// Create offer
const createOffer = asyncHandler(async (req, res) => {
    const offer = await createOfferService(req.body);
    res.status(201).json(offer);
});

// Get all offers
const getAllOffers = asyncHandler(async (req, res) => {
    const offers = await getAllOffersService();
    res.status(200).json(offers);
});

// Get offer by ID
const getOfferById = asyncHandler(async (req, res) => {
    const offer = await getOfferByIdService(req.params.id);
    res.status(200).json(offer);
});

// Update offer
const updateOffer = asyncHandler(async (req, res) => {
    const updatedOffer = await updateOfferService(req.params.id, req.body);
    res.status(200).json(updatedOffer);
});

// Delete offer
const deleteOffer = asyncHandler(async (req, res) => {
    await deleteOfferService(req.params.id);
    res.status(200).json({
        success: true,
        message: "Offer deleted successfully",
    });
});

module.exports = {
    createOffer,
    getAllOffers,
    getOfferById,
    updateOffer,
    deleteOffer,
};
