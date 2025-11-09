const Category = require("../models/Category");
const AppError = require("../utils/AppError");
const { uploadImage, deleteImage } = require("../utils/cloudinary");

// Create new category
exports.createCategoryService = async (file, body) => {
  if (!file) throw new AppError("Image is required", 400);

  const imageUrl = await uploadImage(file.path, "categories");

  const category = new Category({
    name: body.name,
    color: body.color,
    image: imageUrl,
  });

  return await category.save();
};

// Get all active (non-deleted) categories
exports.getAllCategoriesService = async () => {
  return await Category.find({ isDeleted: false });
};

// Get category by ID
exports.getCategoryByIdService = async (id) => {
  const category = await Category.findById(id);
  if (!category || category.isDeleted) throw new AppError("Category not found", 404);
  return category;
};

// Update category
exports.updateCategoryService = async (id, file, body) => {
  const category = await Category.findById(id);
  if (!category || category.isDeleted) throw new AppError("Category not found", 404);

  let imageUrl = category.image;

  if (file) {
    if (category.image) await deleteImage(category.image);
    imageUrl = await uploadImage(file.path, "categories");
  }

  category.name = body.name || category.name;
  category.color = body.color || category.color;
  category.image = imageUrl;

  return await category.save();
};

// Soft delete category
exports.softDeleteCategoryService = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new AppError("Category not found", 404);

  if (category.image) await deleteImage(category.image);

  category.isDeleted = true;
  await category.save();

  return category;
};
