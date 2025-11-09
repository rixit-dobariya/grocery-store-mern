const asyncHandler = require("../utils/asyncHandler");
const {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  softDeleteCategoryService,
} = require("../services/category.service");

// Create category
const createCategory = asyncHandler(async (req, res) => {
  const savedCategory = await createCategoryService(req.file, req.body);
  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: savedCategory,
  });
});

// Get all categories
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await getAllCategoriesService();
  res.status(200).json({
    success: true,
    message: "Categories fetched successfully",
    data: categories,
  });
});

// Get category by ID
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await getCategoryByIdService(req.params.id);
  res.status(200).json({
    success: true,
    message: "Category fetched successfully",
    data: category,
  });
});

// Update category
const updateCategory = asyncHandler(async (req, res) => {
  const updatedCategory = await updateCategoryService(req.params.id, req.file, req.body);
  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: updatedCategory,
  });
});

// Soft delete category
const softDeleteCategory = asyncHandler(async (req, res) => {
  const deletedCategory = await softDeleteCategoryService(req.params.id);
  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
    data: deletedCategory,
  });
});

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  softDeleteCategory,
};
