import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import AddBanner from "../pages/admin/AddBanner";
import AddToCart from "../pages/admin/AddToCart";
import AddCategory from "../pages/admin/AddCategory";
import AddOffer from "../pages/admin/AddOffer";
import AddOrder from "../pages/admin/AddOrder";
import AddProduct from "../pages/admin/AddProduct";
import AddReview from "../pages/admin/AddReview";
import Cart from "../pages/admin/Cart";
import Users from "../pages/admin/Users";
import UpdateUser from "../pages/admin/UpdateUser";
import AddUser from "../pages/admin/AddUser";
// import Products from "../pages/admin/Products";
// import Reviews from "../pages/admin/Reviews";
// import Orders from "../pages/admin/Orders";
// import Categories from "../pages/admin/Categories";
// import Users from "../pages/admin/Users";
// import Offers from "../pages/admin/Offers";
// import Banners from "../pages/admin/Banners";
// import Responses from "../pages/admin/Responses";
// import SiteSettings from "../pages/admin/SiteSettings";
// import Login from "../pages/admin/Login";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="add-banner" element={<AddBanner />} />
        <Route path="add-to-cart" element={<AddToCart />} />
        <Route path="add-category" element={<AddCategory />} />
        <Route path="add-offer" element={<AddOffer />} />
        <Route path="add-order" element={<AddOrder />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="add-review" element={<AddReview />} />
        <Route path="cart" element={<Cart />} />
        <Route path="users" element={<Users />} />
        <Route path="update-user" element={<UpdateUser />} />
        <Route path="add-user" element={<AddUser />} />
        {/* <Route path="products" element={<Products />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="orders" element={<Orders />} />
        <Route path="categories" element={<Categories />} />
        <Route path="users" element={<Users />} />
        <Route path="offers" element={<Offers />} />
        <Route path="banners" element={<Banners />} />
        <Route path="responses" element={<Responses />} />
        <Route path="site-settings" element={<SiteSettings />} /> */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
