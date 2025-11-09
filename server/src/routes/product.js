const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const upload = require("../middlewares/multer.middleware");
const asyncHandler = require("../utils/asyncHandler");

router.post("/", upload.single("productImage"), asyncHandler(productController.createProduct));

router.get("/", asyncHandler(productController.getAllProducts));
router.get("/trending", asyncHandler(productController.getTrendingProducts));
router.get("/latest", asyncHandler(productController.getLatestProducts));

router.get("/:id", asyncHandler(productController.getProductById));

router.get('/category/:categoryId', asyncHandler(productController.getProductsByCategoryId));

router.put("/:id", upload.single("productImage"), asyncHandler(productController.updateProduct));

router.delete("/:id", asyncHandler(productController.deleteProduct));
module.exports = router;
