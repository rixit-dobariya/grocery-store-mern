const Product = require("../models/Product");
const Review = require("../models/Review");
const OrderItem = require("../models/OrderItem");
const { uploadImage, deleteImage } = require("../utils/cloudinary");
const AppError = require("../utils/AppError");

// Get single product by ID with reviews
exports.getProductByIdService = async (productId) => {
    const product = await Product.findById(productId).populate("categoryId");
    if (!product || !product.isActive) throw new AppError("Product not found", 404);

    const ratingAggregation = await Review.aggregate([
        { $match: { productId: product._id } },
        {
            $group: {
                _id: "$productId",
                avgRating: { $avg: "$rating" },
                totalReviews: { $sum: 1 },
            },
        },
    ]);

    const avgRating = ratingAggregation[0]?.avgRating || 0;
    const totalReviews = ratingAggregation[0]?.totalReviews || 0;

    return {
        ...product.toObject(),
        averageRating: avgRating.toFixed(1),
        totalReviews,
    };
};

// Create product
exports.createProductService = async (body, file) => {
    const { productName, description, discount, costPrice, salePrice, stock, categoryId } = body;

    let imageUrl = "";
    if (file) {
        imageUrl = await uploadImage(file.path, "products");
    }

    const newProduct = await Product.create({
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

    return newProduct;
};

// Get all active products with review stats
exports.getAllProductsService = async () => {
    const products = await Product.find({ isActive: true }).populate("categoryId");

    const reviewStats = await Review.aggregate([
        { $match: {} },
        {
            $group: {
                _id: "$productId",
                avgRating: { $avg: "$rating" },
                totalReviews: { $sum: 1 },
            },
        },
    ]);

    const reviewMap = {};
    reviewStats.forEach((stat) => {
        reviewMap[stat._id.toString()] = {
            avgRating: stat.avgRating.toFixed(1),
            totalReviews: stat.totalReviews,
        };
    });

    return products.map((product) => {
        const stats = reviewMap[product._id.toString()] || { avgRating: "0.0", totalReviews: 0 };
        return {
            ...product.toObject(),
            averageRating: stats.avgRating,
            totalReviews: stats.totalReviews,
        };
    });
};

// Get trending products
exports.getTrendingProductsService = async () => {
    const salesStats = await OrderItem.aggregate([
        { $group: { _id: "$productId", salesCount: { $sum: "$quantity" } } },
        { $sort: { salesCount: -1 } },
        { $limit: 8 },
    ]);

    const topIds = salesStats.map((item) => item._id);

    const products = await Product.find({ _id: { $in: topIds }, isActive: true }).populate(
        "categoryId"
    );

    const reviewStats = await Review.aggregate([
        { $match: { productId: { $in: topIds } } },
        {
            $group: {
                _id: "$productId",
                avgRating: { $avg: "$rating" },
                totalReviews: { $sum: 1 },
            },
        },
    ]);

    const reviewMap = {};
    reviewStats.forEach((stat) => {
        reviewMap[stat._id.toString()] = {
            avgRating: stat.avgRating.toFixed(1),
            totalReviews: stat.totalReviews,
        };
    });

    return products.map((product) => {
        const stats = reviewMap[product._id.toString()] || { avgRating: "0.0", totalReviews: 0 };
        return {
            ...product.toObject(),
            averageRating: stats.avgRating,
            totalReviews: stats.totalReviews,
        };
    });
};

// Get latest products (sorted by creation)
exports.getLatestProductsService = async () => {
    const products = await Product.find({ isActive: true })
        .sort({ createdAt: -1 })
        .limit(8)
        .populate("categoryId");

    const productIds = products.map((p) => p._id);

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
    reviewStats.forEach((stat) => {
        reviewMap[stat._id.toString()] = {
            avgRating: stat.avgRating.toFixed(1),
            totalReviews: stat.totalReviews,
        };
    });

    return products.map((product) => {
        const stats = reviewMap[product._id.toString()] || { avgRating: "0.0", totalReviews: 0 };
        return {
            ...product.toObject(),
            averageRating: stats.avgRating,
            totalReviews: stats.totalReviews,
        };
    });
};

// Update product by ID
exports.updateProductService = async (id, body, file) => {
    const { productName, description, discount, costPrice, salePrice, stock, categoryId } = body;

    const product = await Product.findById(id);
    if (!product || !product.isActive) throw new AppError("Product not found", 404);

    // Handle image replacement
    if (file) {
        if (product.productImage) {
            try {
                const matches = product.productImage.match(/\/([^/]+)\.(jpg|jpeg|png|gif)$/i);
                if (matches && matches[1]) {
                    const publicId = `products/${matches[1]}`;
                    await deleteImage(publicId);
                }
            } catch (err) {
                console.warn("Failed to delete old image:", err.message);
            }
        }
        const newImageUrl = await uploadImage(file.path, "products");
        product.productImage = newImageUrl;
    }

    // Update other fields
    product.productName = productName;
    product.description = description;
    product.discount = discount;
    product.costPrice = costPrice;
    product.salePrice = salePrice;
    product.stock = stock;
    product.categoryId = categoryId;

    await product.save();
    return product;
};

// Soft delete product
exports.deleteProductService = async (id) => {
    const product = await Product.findById(id);
    if (!product || !product.isActive) throw new AppError("Product not found", 404);

    product.isActive = false;
    await product.save();

    return { message: "Product marked as inactive successfully" };
};

// Get products by category
exports.getProductsByCategoryIdService = async (categoryId) => {
    const products = await Product.find({ categoryId, isActive: true });

    if (products.length === 0) throw new AppError("No products found in this category", 404);

    const productIds = products.map((p) => p._id);

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
    reviewStats.forEach((stat) => {
        reviewMap[stat._id.toString()] = {
            avgRating: stat.avgRating.toFixed(1),
            totalReviews: stat.totalReviews,
        };
    });

    return products.map((product) => {
        const stats = reviewMap[product._id.toString()] || { avgRating: "0.0", totalReviews: 0 };
        return {
            ...product.toObject(),
            averageRating: stats.avgRating,
            totalReviews: stats.totalReviews,
        };
    });
};
