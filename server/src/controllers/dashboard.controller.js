const Product = require("../models/Product");
const Order = require("../models/Order");
const Category = require("../models/Category");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

exports.getDashboardStats = asyncHandler(async (req, res) => {
  const [totalActiveProducts, totalOrders, totalCategories, totalActiveUsers] = await Promise.all([
    Product.countDocuments({ isActive: true }),
    Order.countDocuments({ isDeleted: false }),
    Category.countDocuments({ isDeleted: false }),
    User.countDocuments({ role: "User", status: "Active" })
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalActiveProducts,
      totalOrders,
      totalCategories,
      totalActiveUsers
    }
  });
});
