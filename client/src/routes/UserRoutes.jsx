import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import About from "../pages/user/About";
import MyAccount from "../pages/user/MyAccount/MyAccount";
import Cart from "../pages/user/Cart";
import Shop from "../pages/user/Shop";
import Checkout from "../pages/user/Checkout/Checkout";
import ForgotPassword from "../pages/user/ForgotPassword";
import Contact from "../pages/user/Contact";
import Home from "../pages/user/Home/Home";
import Login from "../pages/user/Login";
import OrderDetails from "../pages/user/OrderDetails";
import OrderConfirmation from "../pages/user/OrderConfirmation";
import OtpVerification from "../pages/user/OtpVerification";
import ProductDetails from "../pages/user/ProductDetails";
import Register from "../pages/user/Register";
import ResetPassword from "../pages/user/ResetPassword";
import Wishlist from "../pages/user/Wishlist";

const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="account" element={<MyAccount />} />
        <Route path="cart" element={<Cart />}  />
        <Route path="shop" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="contact" element={<Contact />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="order" element={<OrderDetails />} />
        <Route path="order-confirm" element={<OrderConfirmation />} />
        <Route path="verify-otp" element={<OtpVerification />} />
        <Route path="product" element={<ProductDetails />} />
        <Route path="register" element={<Register />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="wishlist" element={<Wishlist />} />
        </Route>
  </Routes>
  );
};

export default UserRoutes;
