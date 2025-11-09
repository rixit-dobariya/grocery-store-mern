const express = require("express");
const router = express.Router();
const responseController = require("../controllers/response.controller");
const asyncHandler = require("../utils/asyncHandler");

router.post("/", asyncHandler(responseController.createResponse));
router.get("/", asyncHandler(responseController.getAllResponses));
router.get("/:id", asyncHandler(responseController.getResponseById));
router.put("/:id/reply", asyncHandler(responseController.updateReply));
router.delete("/:id", asyncHandler(responseController.deleteResponse));

module.exports = router;
