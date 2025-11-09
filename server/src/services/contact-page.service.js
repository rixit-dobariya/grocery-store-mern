const ContactPage = require("../models/ContactPage");
const AppError = require("../utils/AppError");

// Get contact page details
exports.getContactPageService = async () => {
  const contactPage = await ContactPage.findOne();
  return contactPage || {};
};

// Create or update contact page details
exports.updateContactPageService = async (contactEmail, contactNumber) => {
  if (!contactEmail && !contactNumber) {
    throw new AppError("No contact data provided", 400);
  }

  let contactPage = await ContactPage.findOne();

  if (!contactPage) {
    contactPage = new ContactPage({ contactEmail, contactNumber });
  } else {
    if (contactEmail) contactPage.contactEmail = contactEmail;
    if (contactNumber) contactPage.contactNumber = contactNumber;
  }

  await contactPage.save();
  return contactPage;
};
