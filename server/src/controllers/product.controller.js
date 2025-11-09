const asyncHandler = require("../utils/asyncHandler");
const {
  getProductByIdService,
  createProductService,
  getAllProductsService,
  getTrendingProductsService,
    getLatestProductsService,
  updateProductService,
  deleteProductService,
  getProductsByCategoryIdService,
} = require("../services/product.service");

// Get product by ID
const getProductById = asyncHandler(async (req, res) => {
  const product = await getProductByIdService(req.params.id);
  res.status(200).json({
    success: true,
    message: "Product fetched successfully.",
    data: product,
  });
});

// Create new product
const createProduct = asyncHandler(async (req, res) => {
  const product = await createProductService(req.body, req.file);
  res.status(201).json({
    success: true,
    message: "Product created successfully.",
    data: product,
  });
});

// Get all active products
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await getAllProductsService();
  res.status(200).json({
    success: true,
    message: "Products fetched successfully.",
    data: products,
  });
});

// Get trending products
const getTrendingProducts = asyncHandler(async (req, res) => {
  const products = await getTrendingProductsService();
  res.status(200).json({
    success: true,
    message: "Trending products fetched successfully.",
    data: products,
  });
});

// Get latest products
const getLatestProducts = asyncHandler(async (req, res) => {
  const products = await getLatestProductsService();
  res.status(200).json({
    success: true,
    message: "Latest products fetched successfully.",
    data: products,
  });
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
  const updated = await updateProductService(req.params.id, req.body, req.file);
  res.status(200).json({
    success: true,
    message: "Product updated successfully.",
    data: updated,
  });
});

// Soft delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const result = await deleteProductService(req.params.id);
  res.status(200).json({
    success: true,
    message: result.message,
  });
});

// Get products by category
const getProductsByCategoryId = asyncHandler(async (req, res) => {
  const products = await getProductsByCategoryIdService(req.params.categoryId);
  res.status(200).json({
    success: true,
    message: "Products fetched successfully for this category.",
    data: products,
  });
});


module.exports = {
  getProductById,
  createProduct,
  getAllProducts,
  getTrendingProducts,
    getLatestProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
};