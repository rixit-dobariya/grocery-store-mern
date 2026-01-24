import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import addressService from "../services/address.service.js";

export const addAddress = asyncHandler(async (req, res) => {
  const savedAddress = await addressService.addAddress(req.body);
  res.status(201).json(savedAddress);
});

export const getAddressById = asyncHandler(async (req, res) => {
  const address = await addressService.getAddressById(req.params.addressId);
  res.status(200).json(address);
});

export const getAddressesByUserId = asyncHandler(async (req, res) => {
  const addresses = await addressService.getAddressesByUserId(req.params.userId);
  res.status(200).json(addresses);
});

export const updateAddress = asyncHandler(async (req, res) => {
  const updatedAddress = await addressService.updateAddress(req.params.addressId, req.body);
  res.status(200).json(updatedAddress);
});
