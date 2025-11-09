const Offer = require("../models/Offer");
const AppError = require("../utils/AppError");

// Helper: Check if offer is currently active
const isActive = (startDate, endDate) => {
    const now = new Date();
    return new Date(startDate) <= now && now <= new Date(endDate);
};

// Create offer
exports.createOfferService = async (offerData) => {
    const offer = new Offer(offerData);
    await offer.save();

    const offerObj = offer.toObject();
    offerObj.activeStatus = isActive(offer.startDate, offer.endDate);
    return offerObj;
};

// Get all offers
exports.getAllOffersService = async () => {
    const offers = await Offer.find();

    return offers.map((offer) => {
        const offerObj = offer.toObject();
        offerObj.activeStatus = isActive(offer.startDate, offer.endDate);
        return offerObj;
    });
};

// Get offer by ID
exports.getOfferByIdService = async (id) => {
    const offer = await Offer.findById(id);
    if (!offer) throw new AppError("Offer not found", 404);

    const offerObj = offer.toObject();
    offerObj.activeStatus = isActive(offer.startDate, offer.endDate);
    return offerObj;
};

// Update offer
exports.updateOfferService = async (id, updateData) => {
    const updatedOffer = await Offer.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });

    if (!updatedOffer) throw new AppError("Offer not found", 404);

    const offerObj = updatedOffer.toObject();
    offerObj.activeStatus = isActive(updatedOffer.startDate, updatedOffer.endDate);
    return offerObj;
};

// Delete offer
exports.deleteOfferService = async (id) => {
    const deletedOffer = await Offer.findByIdAndDelete(id);
    if (!deletedOffer) throw new AppError("Offer not found", 404);
    return true;
};
