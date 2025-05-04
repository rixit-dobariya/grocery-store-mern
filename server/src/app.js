const express= require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const connectDB = require("./db/index.js")
require("dotenv").config()

//import routers
const userRoutes =require("./routes/user.js");
const bannerRoutes = require("./routes/banner.js");
const addressRoutes = require("./routes/address.js");
const aboutPageRoutes = require("./routes/about-page.js");
const cartRoutes = require("./routes/cart.js");
const categoryRoutes = require("./routes/category.js");
const contactPageRoutes = require("./routes/contact-page.js");
const responseRoutes = require("./routes/response.js");
const offerRoutes = require("./routes/offer.js");
const productRoutes = require("./routes/product.js");
const reviewRoutes = require("./routes/review.js");
const orderRoutes = require("./routes/order.js");
const wishlistRoutes = require("./routes/wishlist.js");
const dashboardRoutes = require("./routes/dashboard.js");
const paymentRoutes = require("./routes/payment.js");

const app = express()

app.use(cors()); 
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


app.use("/users", userRoutes);
app.use("/banners", bannerRoutes);
app.use("/addresses", addressRoutes);
app.use("/about-page", aboutPageRoutes);
app.use("/cart", cartRoutes);
app.use("/categories", categoryRoutes);
app.use("/contact", contactPageRoutes);
app.use("/responses",responseRoutes);
app.use("/offers",offerRoutes);
app.use("/products",productRoutes);
app.use("/reviews",reviewRoutes);
app.use("/orders",orderRoutes);
app.use("/wishlist",wishlistRoutes);
app.use('/dashboard',dashboardRoutes);
app.use('/payment',paymentRoutes);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.get("/",(req,res)=>res.send("hello world"));

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

