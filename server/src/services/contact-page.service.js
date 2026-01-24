import ContactPage from "../models/ContactPage.js";
import { ApiError } from "../utils/ApiError.js";

class ContactPageService {
    async getContactPage() {
        const contactPage = await ContactPage.findOne();
        return contactPage || {};
    }

    async updateContactPage(updateData) {
        const { contactEmail, contactNumber } = updateData;

        let contactPage = await ContactPage.findOne();

        if (!contactPage && (!contactEmail || !contactNumber)) {
            throw new ApiError(400, "No contact data provided");
        }

        if (!contactPage) {
            contactPage = new ContactPage({ contactEmail, contactNumber });
        } else {
            if (contactEmail) contactPage.contactEmail = contactEmail;
            if (contactNumber) contactPage.contactNumber = contactNumber;
        }

        return await contactPage.save();
    }
}

export default new ContactPageService();
