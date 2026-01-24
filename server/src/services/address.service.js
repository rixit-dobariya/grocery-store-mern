import Address from "../models/Address.js";
import { ApiError } from "../utils/ApiError.js";

class AddressService {
    async addAddress(addressData) {
        const address = new Address(addressData);
        return await address.save();
    }

    async getAddressById(id) {
        const address = await Address.findById(id);
        if (!address) throw new ApiError(404, "Address not found");
        return address;
    }

    async getAddressesByUserId(userId) {
        return await Address.find({ userId });
    }

    async updateAddress(id, updateData) {
        const updatedAddress = await Address.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );
        if (!updatedAddress) throw new ApiError(404, "Address not found");
        return updatedAddress;
    }
}

export default new AddressService();
