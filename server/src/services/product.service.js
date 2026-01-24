import Product from "../models/Product.js";
import Review from "../models/Review.js";
import OrderItem from "../models/OrderItem.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";

class ProductService {
    async getProductById(id) {
        const product = await Product.findById(id).populate("categoryId");

        if (!product || !product.isActive) {
            throw new ApiError(404, "Product not found");
        }

        const ratingAggregation = await Review.aggregate([
            { $match: { productId: product._id } },
            {
                $group: {
                    _id: "$productId",
                    avgRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 }
                }
            }
        ]);

        const avgRating = ratingAggregation[0]?.avgRating || 0;
        const totalReviews = ratingAggregation[0]?.totalReviews || 0;

        return {
            ...product.toObject(),
            averageRating: avgRating.toFixed(1),
            totalReviews,
        };
    }

    async createProduct(productData, file) {
        const {
            productName,
            description,
            discount,
            costPrice,
            salePrice,
            stock,
            categoryId,
        } = productData;

        let imageUrl = "";
        if (file) {
            imageUrl = await uploadImage(file.path, "products");
        }

        const newProduct = new Product({
            productName,
            description,
            discount,
            costPrice,
            salePrice,
            stock,
            categoryId,
            productImage: imageUrl,
            isActive: true,
        });

        await newProduct.save();
        return newProduct;
    }

    async getAllProducts() {
        const products = await Product.find({ isActive: true }).populate("categoryId");

        const reviewStats = await Review.aggregate([
            { $match: {} },
            {
                $group: {
                    _id: "$productId",
                    avgRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 }
                }
            }
        ]);

        const reviewMap = {};
        reviewStats.forEach(stat => {
            reviewMap[stat._id.toString()] = {
                avgRating: stat.avgRating.toFixed(1),
                totalReviews: stat.totalReviews
            };
        });

        return products.map(product => {
            const stats = reviewMap[product._id.toString()] || { avgRating: "0.0", totalReviews: 0 };
            return {
                ...product.toObject(),
                averageRating: stats.avgRating,
                totalReviews: stats.totalReviews
            };
        });
    }

    async getTrendingProducts() {
        const salesStats = await OrderItem.aggregate([
            {
                $group: {
                    _id: "$productId",
                    salesCount: { $sum: "$quantity" }
                }
            },
            { $sort: { salesCount: -1 } },
            { $limit: 8 }
        ]);

        const topProductIds = salesStats.map(item => item._id);

        const products = await Product.find({ _id: { $in: topProductIds }, isActive: true })
            .populate("categoryId");

        const reviewStats = await Review.aggregate([
            { $match: { productId: { $in: topProductIds } } },
            {
                $group: {
                    _id: "$productId",
                    avgRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 }
                }
            }
        ]);

        const reviewMap = {};
        reviewStats.forEach(stat => {
            reviewMap[stat._id.toString()] = {
                avgRating: stat.avgRating.toFixed(1),
                totalReviews: stat.totalReviews
            };
        });

        return products.map(product => {
            const stats = reviewMap[product._id.toString()] || { avgRating: "0.0", totalReviews: 0 };
            return {
                ...product.toObject(),
                averageRating: stats.avgRating,
                totalReviews: stats.totalReviews
            };
        });
    }

    async getLatestProducts() {
        const products = await Product.find({ isActive: true })
            .sort({ createdAt: -1 })
            .limit(8)
            .populate("categoryId");

        const productIds = products.map(p => p._id);

        const reviewStats = await Review.aggregate([
            { $match: { productId: { $in: productIds } } },
            {
                $group: {
                    _id: "$productId",
                    avgRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 }
                }
            }
        ]);

        const reviewMap = {};
        reviewStats.forEach(stat => {
            reviewMap[stat._id.toString()] = {
                avgRating: stat.avgRating.toFixed(1),
                totalReviews: stat.totalReviews
            };
        });

        return products.map(product => {
            const stats = reviewMap[product._id.toString()] || { avgRating: "0.0", totalReviews: 0 };
            return {
                ...product.toObject(),
                averageRating: stats.avgRating,
                totalReviews: stats.totalReviews
            };
        });
    }

    async updateProduct(id, productData, file) {
        const product = await Product.findById(id);

        if (!product || !product.isActive) {
            throw new ApiError(404, "Product not found");
        }

        if (file) {
            if (product.productImage) {
                const matches = product.productImage.match(/\/([^/]+)\.(jpg|jpeg|png|gif)$/i);
                if (matches && matches[1]) {
                    const publicId = `products/${matches[1]}`;
                    await deleteImage(publicId);
                }
            }
            product.productImage = await uploadImage(file.path, "products");
        }

        Object.assign(product, productData);
        await product.save();
        return product;
    }

    async deleteProduct(id) {
        const product = await Product.findById(id);
        if (!product || !product.isActive) {
            throw new ApiError(404, "Product not found");
        }

        product.isActive = false;
        await product.save();
        return { message: "Product marked as inactive successfully" };
    }

    async getProductsByCategoryId(categoryId) {
        const products = await Product.find({ categoryId, isActive: true });

        if (products.length === 0) {
            throw new ApiError(404, "No products found in this category");
        }

        const productIds = products.map(p => p._id);

        const reviewStats = await Review.aggregate([
            { $match: { productId: { $in: productIds } } },
            {
                $group: {
                    _id: "$productId",
                    avgRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 },
                },
            },
        ]);

        const reviewMap = {};
        reviewStats.forEach(stat => {
            reviewMap[stat._id.toString()] = {
                avgRating: stat.avgRating.toFixed(1),
                totalReviews: stat.totalReviews,
            };
        });

        return products.map(product => {
            const stats = reviewMap[product._id.toString()] || { avgRating: "0.0", totalReviews: 0 };
            return {
                ...product.toObject(),
                averageRating: stats.avgRating,
                totalReviews: stats.totalReviews,
            };
        });
    }
}

export default new ProductService();
