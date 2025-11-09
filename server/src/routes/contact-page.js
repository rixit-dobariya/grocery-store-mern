const express = require("express");
const router = express.Router();
const contactPageController = require("../controllers/contact-page.controller");
const asyncHandler = require("../utils/asyncHandler");

router.get("/", asyncHandler(contactPageController.getContactPage));
router.put("/", asyncHandler(contactPageController.updateContactPage));

module.exports = router;
