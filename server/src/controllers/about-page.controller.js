import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import aboutPageService from "../services/about-page.service.js";

export const getAboutPage = asyncHandler(async (req, res) => {
  const result = await aboutPageService.getAboutPage();
  res.status(200).json(result);
});

export const updateAboutPage = asyncHandler(async (req, res) => {
  const result = await aboutPageService.updateAboutPage(req.body.content);
  res.status(200).json(result);
});