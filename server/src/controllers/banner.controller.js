const asyncHandler = require("../utils/asyncHandler");
const {
    addBannerService,
    getAllBannersService,
    getBannerByIdService,
    updateBannerService,
    deleteBannerService,
    toggleBannerStatusService,
} = require("../services/banner.service");

const addBanner = asyncHandler(async (req, res) => {
    const savedBanner = await addBannerService(req.file, req.body);
    res.status(201).json({
        success: true,
        message: "Banner added successfully",
        data: savedBanner,
    });
});

const getAllBanners = asyncHandler(async (req, res) => {
    const banners = await getAllBannersService();
    res.status(200).json({
        success: true,
        message: "Banners retrieved successfully",
        data: banners,
    });
});

const getBannerById = asyncHandler(async (req, res) => {
    const banner = await getBannerByIdService(req.params.bannerId);
    res.status(200).json({
        success: true,
        message: "Banner retrieved successfully",
        data: banner,
    });
});

const updateBanner = asyncHandler(async (req, res) => {
    const updatedBanner = await updateBannerService(req.params.bannerId, req.file, req.body);
    res.status(200).json({
        success: true,
        message: "Banner updated successfully",
        data: updatedBanner,
    });
});

const deleteBanner = asyncHandler(async (req, res) => {
    await deleteBannerService(req.params.bannerId);
    res.status(200).json({
        success: true,
        message: "Banner deleted successfully",
    });
});

const toggleBannerStatus = asyncHandler(async (req, res) => {
    const updatedBanner = await toggleBannerStatusService(req.params.bannerId, req.body.status);
    res.status(200).json({
        success: true,
        message: `Banner ${updatedBanner.activeStatus ? "activated" : "deactivated"} successfully`,
        data: updatedBanner,
    });
});

module.exports = {
    addBanner,
    getAllBanners,
    getBannerById,
    updateBanner,
    deleteBanner,
    toggleBannerStatus,
};
