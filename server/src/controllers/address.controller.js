import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const address = new Address(req.body);
    const savedAddress = await address.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add address', error });
  }
};

export const getAddressById = async (req, res) => {
  try {
    const address = await Address.findById(req.params.addressId);
    if (!address) return res.status(404).json({ message: 'Address not found' });
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch address', error });
  }
};

export const getAddressesByUserId = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.params.userId });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch addresses', error });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.addressId,
      { $set: req.body },
      { new: true }
    );
    if (!updatedAddress) return res.status(404).json({ message: 'Address not found' });
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update address', error });
  }
};
