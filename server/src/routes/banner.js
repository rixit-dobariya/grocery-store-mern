const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware");
const bannerController = require("../controllers/banner.controller");
const asyncHandler = require("../utils/asyncHandler");

router.post("/", upload.single("bannerImage"), asyncHandler(bannerController.addBanner));
router.get("/", asyncHandler(bannerController.getAllBanners));
router.get("/:bannerId", asyncHandler(bannerController.getBannerById));
router.put("/:bannerId", upload.single("bannerImage"), asyncHandler(bannerController.updateBanner));
router.delete("/:bannerId", asyncHandler(bannerController.deleteBanner));
router.patch("/:bannerId/status", asyncHandler(bannerController.toggleBannerStatus));

module.exports = router;
