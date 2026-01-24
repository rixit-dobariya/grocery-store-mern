import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import contactPageService from "../services/contact-page.service.js";

export const getContactPage = asyncHandler(async (req, res) => {
  const contactPage = await contactPageService.getContactPage();
  res.status(200).json(contactPage);
});

export const updateContactPage = asyncHandler(async (req, res) => {
  const contactPage = await contactPageService.updateContactPage(req.body);
  res.status(200).json(contactPage);
});
