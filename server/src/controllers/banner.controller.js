import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bannerService from "../services/banner.service.js";

export const addBanner = asyncHandler(async (req, res) => {
  const savedBanner = await bannerService.addBanner(req.body, req.file);
  res.status(201).json(savedBanner);
});

export const getAllBanners = asyncHandler(async (req, res) => {
  const banners = await bannerService.getAllBanners();
  res.status(200).json(banners);
});

export const getBannerById = asyncHandler(async (req, res) => {
  const banner = await bannerService.getBannerById(req.params.bannerId);
  res.status(200).json(banner);
});

export const updateBanner = asyncHandler(async (req, res) => {
  const updatedBanner = await bannerService.updateBanner(req.params.bannerId, req.body, req.file);
  res.status(200).json(updatedBanner);
});

export const deleteBanner = asyncHandler(async (req, res) => {
  const result = await bannerService.deleteBanner(req.params.bannerId);
  res.status(200).json(result);
});

export const toggleBannerStatus = asyncHandler(async (req, res) => {
  const result = await bannerService.toggleBannerStatus(req.params.bannerId, req.body.status);
  res.status(200).json(result);
});
