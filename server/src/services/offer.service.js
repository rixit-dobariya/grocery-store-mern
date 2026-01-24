import Offer from "../models/Offer.js";
import { ApiError } from "../utils/ApiError.js";

class OfferService {
    isActive(startDate, endDate) {
        const now = new Date();
        return new Date(startDate) <= now && now <= new Date(endDate);
    }

    async createOffer(offerData) {
        const offer = new Offer(offerData);
        await offer.save();
        const offerObject = offer.toObject();
        offerObject.activeStatus = this.isActive(offer.startDate, offer.endDate);
        return offerObject;
    }

    async getAllOffers() {
        const offers = await Offer.find();
        return offers.map((offer) => {
            const offerObj = offer.toObject();
            offerObj.activeStatus = this.isActive(offer.startDate, offer.endDate);
            return offerObj;
        });
    }

    async getOfferById(id) {
        const offer = await Offer.findById(id);
        if (!offer) {
            throw new ApiError(404, "Offer not found");
        }
        const offerObj = offer.toObject();
        offerObj.activeStatus = this.isActive(offer.startDate, offer.endDate);
        return offerObj;
    }

    async updateOffer(id, offerData) {
        const updatedOffer = await Offer.findByIdAndUpdate(
            id,
            offerData,
            { new: true, runValidators: true }
        );
        if (!updatedOffer) {
            throw new ApiError(404, "Offer not found");
        }
        const offerObj = updatedOffer.toObject();
        offerObj.activeStatus = this.isActive(updatedOffer.startDate, updatedOffer.endDate);
        return offerObj;
    }

    async deleteOffer(id) {
        const deletedOffer = await Offer.findByIdAndDelete(id);
        if (!deletedOffer) {
            throw new ApiError(404, "Offer not found");
        }
        return { message: "Offer deleted successfully." };
    }
}

export default new OfferService();
