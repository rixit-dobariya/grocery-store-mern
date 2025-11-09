const asyncHandler = require("../utils/asyncHandler");
const {
    getContactPageService,
    updateContactPageService,
} = require("../services/contact-page.service");

// Get contact page
const getContactPage = asyncHandler(async (req, res) => {
    const contactPage = await getContactPageService();
    res.status(200).json(contactPage);
});

// Update contact page
const updateContactPage = asyncHandler(async (req, res) => {
    const { contactEmail, contactNumber } = req.body;
    const updatedPage = await updateContactPageService(contactEmail, contactNumber);
    res.status(200).json(updatedPage);
});

module.exports = {
    getContactPage,
    updateContactPage,
};
