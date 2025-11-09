const asyncHandler = require("../utils/asyncHandler");
const {
    addAddressService,
    getAddressByIdService,
    getAddressesByUserIdService,
    updateAddressService,
} = require("../services/address.service");

const addAddress = asyncHandler(async (req, res) => {
    const savedAddress = await addAddressService(req.body);
    res.status(201).json({
        success: true,
        message: "Address added successfully",
        data: savedAddress,
    });
});

const getAddressById = asyncHandler(async (req, res) => {
    const address = await getAddressByIdService(req.params.addressId);
    res.status(200).json({
        success: true,
        message: "Address retrieved successfully",
        data: address,
    });
});

const getAddressesByUserId = asyncHandler(async (req, res) => {
    const addresses = await getAddressesByUserIdService(req.params.userId);
    res.status(200).json({
        success: true,
        message: "Addresses retrieved successfully",
        data: addresses,
    });
});

const updateAddress = asyncHandler(async (req, res) => {
    const updatedAddress = await updateAddressService(req.params.addressId, req.body);
    res.status(200).json({
        success: true,
        message: "Address updated successfully",
        data: updatedAddress,
    });
});

module.exports = {
    addAddress,
    getAddressById,
    getAddressesByUserId,
    updateAddress,
};
