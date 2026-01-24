import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import categoryService from "../services/category.service.js";

export const createCategory = asyncHandler(async (req, res) => {
  const savedCategory = await categoryService.createCategory(req.body, req.file);
  res.status(201).json(savedCategory);
});

// Get all categories
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.status(200).json(categories);
});

// Get a single category by ID
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);
  res.status(200).json(category);
});

export const updateCategory = asyncHandler(async (req, res) => {
  const updatedCategory = await categoryService.updateCategory(req.params.id, req.body, req.file);
  res.status(200).json(updatedCategory);
});

// Soft delete a category (mark as deleted without removing from database)
export const softDeleteCategory = asyncHandler(async (req, res) => {
  const result = await categoryService.softDeleteCategory(req.params.id);
  res.status(200).json(result);
});
