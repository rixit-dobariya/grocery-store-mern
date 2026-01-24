import Category from "../models/Category.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";

class CategoryService {
    async createCategory(categoryData, file) {
        if (!file) {
            throw new ApiError(400, "Image is required");
        }

        const { name, color } = categoryData;
        if (!name) throw new ApiError(400, "Category name is required");

        const imageUrl = await uploadImage(file.path, "categories");

        const category = new Category({
            name,
            color,
            image: imageUrl,
        });

        return await category.save();
    }

    async getAllCategories() {
        return await Category.find({ isDeleted: false });
    }

    async getCategoryById(id) {
        const category = await Category.findById(id);
        if (!category || category.isDeleted) {
            throw new ApiError(404, "Category not found");
        }
        return category;
    }

    async updateCategory(id, categoryData, file) {
        const { name, color } = categoryData;

        const category = await Category.findById(id);
        if (!category || category.isDeleted) {
            throw new ApiError(404, "Category not found");
        }

        let imageUrl = category.image;

        if (file) {
            if (category.image) {
                await deleteImage(category.image);
            }
            imageUrl = await uploadImage(file.path, "categories");
        }

        category.name = name || category.name;
        category.color = color || category.color;
        category.image = imageUrl;

        return await category.save();
    }

    async softDeleteCategory(id) {
        const category = await Category.findById(id);

        if (!category) throw new ApiError(404, "Category not found");

        if (category.image) {
            await deleteImage(category.image);
        }

        category.isDeleted = true;
        await category.save();

        return { message: "Category soft deleted", data: category };
    }
}

export default new CategoryService();
