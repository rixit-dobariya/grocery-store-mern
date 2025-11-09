const asyncHandler = require("../utils/asyncHandler");
const { getDashboardStatsService } = require("../services/dashboard.service.js");

const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await getDashboardStatsService();
  res.status(200).json({
    success: true,
    message: "Dashboard stats retrieved successfully",
    data: stats,
  });
});

module.exports = {
  getDashboardStats,
};
