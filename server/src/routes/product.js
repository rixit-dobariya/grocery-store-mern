import express from "express";
const router = express.Router();
import {
    createProduct,
    getAllProducts,
    getTrendingProducts,
    getLatestProducts,
    getProductById,
    getProductsByCategoryId,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js";
import upload from "../middlewares/multer.middleware.js";

router.post("/", upload.single("productImage"), createProduct);

router.get("/", getAllProducts);
router.get("/trending", getTrendingProducts);
router.get("/latest", getLatestProducts);

router.get("/:id", getProductById);

router.get('/category/:categoryId', getProductsByCategoryId);

router.put("/:id", upload.single("productImage"), updateProduct);

router.delete("/:id", deleteProduct);

export default router;
