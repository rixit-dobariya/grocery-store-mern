import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDB from "./db/index.js";
import config from "./config/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";

//import routers
import userRoutes from "./routes/user.js";
import bannerRoutes from "./routes/banner.js";
import addressRoutes from "./routes/address.js";
import aboutPageRoutes from "./routes/about-page.js";
import cartRoutes from "./routes/cart.js";
import categoryRoutes from "./routes/category.js";
import contactPageRoutes from "./routes/contact-page.js";
import responseRoutes from "./routes/response.js";
import offerRoutes from "./routes/offer.js";
import productRoutes from "./routes/product.js";
import reviewRoutes from "./routes/review.js";
import orderRoutes from "./routes/order.js";
import wishlistRoutes from "./routes/wishlist.js";
import dashboardRoutes from "./routes/dashboard.js";
import paymentRoutes from "./routes/payment.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


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
app.use('/dashboard', dashboardRoutes);
app.use('/payment', paymentRoutes);

// Error Handling Middleware
app.use(errorHandler);

connectDB()
    .then(() => {
        app.listen(config.port, () => {
            console.log(`⚙️ Server is running at port : ${config.port}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })

