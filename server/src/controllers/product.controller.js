import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import productService from "../services/product.service.js";

// Get single product by ID with average rating
export const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  res.status(200).json(product);
});

// Create a new product
export const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await productService.createProduct(req.body, req.file);
  res.status(201).json(newProduct);
});

// Get all active products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllProducts();
  res.status(200).json(products);
});

export const getTrendingProducts = asyncHandler(async (req, res) => {
  const products = await productService.getTrendingProducts();
  res.status(200).json(products);
});

export const getLatestProducts = asyncHandler(async (req, res) => {
  const products = await productService.getLatestProducts();
  res.status(200).json(products);
});

// Update product by ID
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body, req.file);
  res.status(200).json(product);
});

// Soft delete (mark as inactive)
export const deleteProduct = asyncHandler(async (req, res) => {
  const result = await productService.deleteProduct(req.params.id);
  res.status(200).json(result);
});

export const getProductsByCategoryId = asyncHandler(async (req, res) => {
  const products = await productService.getProductsByCategoryId(req.params.categoryId);
  res.status(200).json(products);
});
