const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/AppError");
const errorMiddleware = require("./middlewares/error.middleware");
require("dotenv").config();

// Routers
const userRoutes = require("./routes/user");
const bannerRoutes = require("./routes/banner");
const addressRoutes = require("./routes/address");
const aboutPageRoutes = require("./routes/about-page");
const cartRoutes = require("./routes/cart");
const categoryRoutes = require("./routes/category");
const contactPageRoutes = require("./routes/contact-page");
const responseRoutes = require("./routes/response");
const offerRoutes = require("./routes/offer");
const productRoutes = require("./routes/product");
const reviewRoutes = require("./routes/review");
const orderRoutes = require("./routes/order");
const wishlistRoutes = require("./routes/wishlist");
const dashboardRoutes = require("./routes/dashboard");
const paymentRoutes = require("./routes/payment");

const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/users", userRoutes);
app.use("/banners", bannerRoutes);
app.use("/addresses", addressRoutes);
app.use("/about-page", aboutPageRoutes);
app.use("/cart", cartRoutes);
app.use("/categories", categoryRoutes);
app.use("/contact", contactPageRoutes);
app.use("/responses", responseRoutes);
app.use("/offers", offerRoutes);
app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes);
app.use("/orders", orderRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/payment", paymentRoutes);

// 404 handler
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(errorMiddleware);

module.exports = app;
