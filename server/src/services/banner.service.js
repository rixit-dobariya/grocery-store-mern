const Banner = require("../models/Banner");
const AppError = require("../utils/AppError");
const { uploadImage, deleteImage } = require("../utils/cloudinary");

exports.addBannerService = async (file, body) => {
  if (!file) throw new AppError("Banner image is required", 400);

  const imageUrl = await uploadImage(file.path, "banners");

  const banner = new Banner({
    bannerImage: imageUrl,
    viewOrder: body.viewOrder,
    activeStatus: body.activeStatus,
    type: body.type,
  });

  return await banner.save();
};

exports.getAllBannersService = async () => {
  return await Banner.find();
};

exports.getBannerByIdService = async (bannerId) => {
  const banner = await Banner.findById(bannerId);
  if (!banner || banner.isDeleted) throw new AppError("Banner not found", 404);
  return banner;
};

exports.updateBannerService = async (bannerId, file, body) => {
  const banner = await Banner.findById(bannerId);
  if (!banner || banner.isDeleted) throw new AppError("Banner not found", 404);

  let imageUrl = banner.bannerImage;

  if (file) {
    if (banner.bannerImage) await deleteImage(banner.bannerImage);
    imageUrl = await uploadImage(file.path, "banners");
  }

  banner.viewOrder = body.viewOrder || banner.viewOrder;
  banner.activeStatus = body.activeStatus ?? banner.activeStatus;
  banner.bannerImage = imageUrl;
  banner.type = body.type || banner.type;

  return await banner.save();
};

exports.deleteBannerService = async (bannerId) => {
  const banner = await Banner.findById(bannerId);
  if (!banner) throw new AppError("Banner not found", 404);

  if (banner.bannerImage) await deleteImage(banner.bannerImage);
  await Banner.findByIdAndDelete(bannerId);

  return true;
};

exports.toggleBannerStatusService = async (bannerId, status) => {
  if (typeof status !== "boolean")
    throw new AppError("Status must be a boolean", 400);

  const updatedBanner = await Banner.findByIdAndUpdate(
    bannerId,
    { activeStatus: status },
    { new: true }
  );

  if (!updatedBanner) throw new AppError("Banner not found", 404);

  return updatedBanner;
};
