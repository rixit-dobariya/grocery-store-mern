const Product = require("../models/Product");
const Order = require("../models/Order");
const Category = require("../models/Category");
const User = require("../models/User");
const AppError = require("../utils/AppError");

// Fetch dashboard statistics
exports.getDashboardStatsService = async () => {
    const [totalActiveProducts, totalOrders, totalCategories, totalActiveUsers] = await Promise.all(
        [
            Product.countDocuments({ isActive: true }),
            Order.countDocuments({ isDeleted: false }),
            Category.countDocuments({ isDeleted: false }),
            User.countDocuments({ role: "User", status: "Active" }),
        ]
    );

    // Defensive check (very rare but safe)
    if (
        totalActiveProducts === undefined ||
        totalOrders === undefined ||
        totalCategories === undefined ||
        totalActiveUsers === undefined
    ) {
        throw new AppError("Failed to fetch dashboard statistics", 500);
    }

    return {
        totalActiveProducts,
        totalOrders,
        totalCategories,
        totalActiveUsers,
    };
};
