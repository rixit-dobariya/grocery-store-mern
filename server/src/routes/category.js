const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

const upload = require("../middlewares/multer.middleware"); 
const asyncHandler = require("../utils/asyncHandler");

router.post("/", upload.single("image"), asyncHandler(categoryController.createCategory));
router.get("/", asyncHandler(categoryController.getAllCategories));
router.get("/:id", asyncHandler(categoryController.getCategoryById));
router.put("/:id", upload.single("image"), asyncHandler(categoryController.updateCategory));
router.delete("/:id", asyncHandler(categoryController.softDeleteCategory));

module.exports = router;
