const express = require("express");
const router = express.Router();
const aboutPageController = require("../controllers/about-page.controller");
const asyncHandler = require("../utils/asyncHandler");

router.get("/", asyncHandler(aboutPageController.getAboutPage));
router.put("/", asyncHandler(aboutPageController.updateAboutPage));

module.exports = router;
