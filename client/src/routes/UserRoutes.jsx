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

const UserRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<UserLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="account" element={<MyAccount />} />
      <Route path="cart/:id?" element={<Cart />}  />
      <Route path="shop" element={<Shop />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="contact" element={<Contact />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
    </Route>
  </Routes>
  );
};

export default UserRoutes;
