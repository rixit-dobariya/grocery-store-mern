import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {  toast } from 'react-toastify';

const WishlistTable = () => {
  const wishlist=[
    { id: 1, name: "1 KG Apple", price: 500, image: "img/items/products/66ee9001ceeaeapple.webp" },
    { id: 2, name: "Cookie Cake", price: 500, image: "img/items/products/cookiecake.webp" },
    { id: 3, name: "Oreo", price: 500, image: "img/items/products/oreo.webp" }
  ]
  const handleDelete = () => {
    toast.success('Product removed from wishlist!', { position: "top-right" });
  };

  return (
    <>
      <table className="table cart-table text-nowrap">
        <thead>
          <tr className="heading">
            <td>Product</td>
            <td>Price</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.name} className="image-item d-inline-block" />
                  <div className="d-inline-block">{item.name}</div>
                </td>
                <td>₹{item.price}</td>
                <td>
                  <Link className="primary-btn update-btn" to="/cart">
                    Add to cart
                  </Link>
                  <button className="primary-btn delete-btn ms-2" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">Your wishlist is empty.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default WishlistTable;
