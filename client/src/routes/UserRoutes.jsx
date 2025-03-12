import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import MyAccount from "../pages/user/MyAccount/MyAccount";
import Cart from "../pages/user/Cart";
import Shop from "../pages/user/Shop";
import Checkout from "../pages/user/Checkout";

const UserRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<UserLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="account" element={<MyAccount />} />
      <Route path="cart" element={<Cart />} />
      <Route path="shop" element={<Shop />} />
      <Route path="checkout" element={<Checkout />} />
    </Route>
  </Routes>
  );
};

export default UserRoutes;
