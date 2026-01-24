import express from "express";
const router = express.Router();

import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Category from "../models/Category.js";
import User from "../models/User.js";

router.get("/", async (req, res) => {
  try {
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
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
