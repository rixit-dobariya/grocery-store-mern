import Banner from "../models/Banner.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";

class BannerService {
    async addBanner(bannerData, file) {
        if (!file) {
            throw new ApiError(400, "Banner image is required");
        }

        const imageUrl = await uploadImage(file.path, "banners");

        const banner = new Banner({
            bannerImage: imageUrl,
            viewOrder: bannerData.viewOrder,
            activeStatus: bannerData.activeStatus,
        });

        return await banner.save();
    }

    async getAllBanners() {
        return await Banner.find();
    }

    async getBannerById(id) {
        const banner = await Banner.findById(id);
        if (!banner || banner.isDeleted) {
            throw new ApiError(404, "Banner not found");
        }
        return banner;
    }

    async updateBanner(id, bannerData, file) {
        const { viewOrder, activeStatus, type } = bannerData;

        const banner = await Banner.findById(id);
        if (!banner || banner.isDeleted) {
            throw new ApiError(404, "Banner not found");
        }

        let imageUrl = banner.bannerImage;

        if (file) {
            if (banner.bannerImage) {
                await deleteImage(banner.bannerImage);
            }
            imageUrl = await uploadImage(file.path, "banners");
        }

        banner.viewOrder = viewOrder || banner.viewOrder;
        banner.activeStatus = activeStatus || banner.activeStatus;
        banner.bannerImage = imageUrl;
        banner.type = type || banner.type;

        return await banner.save();
    }

    async deleteBanner(id) {
        const banner = await Banner.findById(id);
        if (!banner) throw new ApiError(404, "Banner not found");

        if (banner.bannerImage) {
            await deleteImage(banner.bannerImage);
        }

        await Banner.findByIdAndDelete(id);
        return { message: "Banner deleted successfully" };
    }

    async toggleBannerStatus(id, status) {
        if (typeof status !== "boolean") {
            throw new ApiError(400, "Status must be a boolean");
        }

        const updatedBanner = await Banner.findByIdAndUpdate(
            id,
            { activeStatus: status },
            { new: true }
        );

        if (!updatedBanner) {
            throw new ApiError(404, "Banner not found");
        }

        return { message: `Banner ${status ? 'activated' : 'deactivated'} successfully`, banner: updatedBanner };
    }
}

export default new BannerService();
