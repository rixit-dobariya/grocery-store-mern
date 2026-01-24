import express from "express";
const router = express.Router();
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    softDeleteCategory,
} from "../controllers/category.controller.js";

// Import configured multer
import upload from "../middlewares/multer.middleware.js"; // adjust the path if needed

router.post("/", upload.single("image"), createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id", upload.single("image"), updateCategory);
router.delete("/:id", softDeleteCategory);

export default router;
