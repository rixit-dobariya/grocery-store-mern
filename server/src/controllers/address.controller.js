const asyncHandler = require("../utils/asyncHandler");
const {
    addAddressService,
    getAddressByIdService,
    getAddressesByUserIdService,
    updateAddressService,
} = require("../services/address.service");

const addAddress = asyncHandler(async (req, res) => {
    const savedAddress = await addAddressService(req.body);
    res.status(201).json(savedAddress);
});

const getAddressById = asyncHandler(async (req, res) => {
    const address = await getAddressByIdService(req.params.addressId);
    res.status(200).json(address);
});

const getAddressesByUserId = asyncHandler(async (req, res) => {
    const addresses = await getAddressesByUserIdService(req.params.userId);
    res.status(200).json(addresses);
});

const updateAddress = asyncHandler(async (req, res) => {
    const updatedAddress = await updateAddressService(req.params.addressId, req.body);
    res.status(200).json(updatedAddress);
});

module.exports = {
    addAddress,
    getAddressById,
    getAddressesByUserId,
    updateAddress,
};
