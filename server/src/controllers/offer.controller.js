import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import offerService from "../services/offer.service.js";

// Create a new offer
export const createOffer = asyncHandler(async (req, res) => {
  const offer = await offerService.createOffer(req.body);
  res.status(201).json(offer);
});

// Get all offers with activeStatus calculated
export const getAllOffers = asyncHandler(async (req, res) => {
  const offers = await offerService.getAllOffers();
  res.status(200).json(offers);
});

// Get offer by ID
export const getOfferById = asyncHandler(async (req, res) => {
  const offer = await offerService.getOfferById(req.params.id);
  res.status(200).json(offer);
});

// Update an offer
export const updateOffer = asyncHandler(async (req, res) => {
  const offer = await offerService.updateOffer(req.params.id, req.body);
  res.status(200).json(offer);
});

// Delete an offer
export const deleteOffer = asyncHandler(async (req, res) => {
  const result = await offerService.deleteOffer(req.params.id);
  res.status(200).json(result);
});
