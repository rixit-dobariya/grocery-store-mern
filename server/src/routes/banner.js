import express from "express";
const router = express.Router();
import upload from "../middlewares/multer.middleware.js";
import {
    addBanner,
    getAllBanners,
    getBannerById,
    updateBanner,
    deleteBanner,
    toggleBannerStatus,
} from "../controllers/banner.controller.js";

router.post("/", upload.single("bannerImage"), addBanner);
router.get("/", getAllBanners);
router.get("/:bannerId", getBannerById);
router.put("/:bannerId", upload.single("bannerImage"), updateBanner);
router.delete("/:bannerId", deleteBanner);
router.patch("/:bannerId/status", toggleBannerStatus);

export default router;
