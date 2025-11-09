const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboard.controller");
const asyncHandler = require("../utils/asyncHandler");

router.get("/", asyncHandler(getDashboardStats));

module.exports = router;
