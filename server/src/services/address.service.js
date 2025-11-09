const Address = require("../models/Address");
const AppError = require("../utils/AppError");

exports.addAddressService = async (data) => {
  const address = new Address(data);
  return await address.save();
};

exports.getAddressByIdService = async (addressId) => {
  const address = await Address.findById(addressId);
  if (!address) throw new AppError("Address not found", 404);
  return address;
};

exports.getAddressesByUserIdService = async (userId) => {
  const addresses = await Address.find({ userId });
  return addresses;
};

exports.updateAddressService = async (addressId, data) => {
  const updatedAddress = await Address.findByIdAndUpdate(
    addressId,
    { $set: data },
    { new: true }
  );

  if (!updatedAddress) throw new AppError("Address not found", 404);
  return updatedAddress;
};
