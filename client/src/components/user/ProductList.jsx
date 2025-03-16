import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductList = () => {
    const products = [
        {
            id: 1,
            name: "Fresh Apples",
            category: "Fruits",
            categoryId: 1,
            image: "66ee9001ceeaeapple.webp",
            price: 200,
            salePrice: 250,
            discount: 20,
            stock: 10,
            rating: 4,
            reviews: 25
        },
        {
            id: 2,
            name: "Cookie Cake",
            category: "Snacks",
            categoryId: 2,
            image: "cookiecake.webp",
            price: 800,
            salePrice: 1000,
            discount: 20,
            stock: 0,
            rating: 5,
            reviews: 15
        },
        {
            id: 3,
            name: "Vagh Bakri Chai",
            category: "Tea",
            categoryId: 3,
            image: "vaghbakri.webp",
            price: 1200,
            salePrice: 1400,
            discount: 15,
            stock: 5,
            rating: 3,
            reviews: 30
        }
    ];

    const handleWishlistClick = () => {
        toast.success("Product added to wishlist successfully!");
    };

    return (
        <div className="row justify-content-start align-items-stretch">
            {products.map((product) => {
                const isOutOfStock = product.stock <= 0;
                return (
                    <div key={product.id} className="col-lg-3 col-md-4 col-6 gap p-2 mt-2">
                        <div className={`card h-100 ${isOutOfStock ? 'disabled-card' : ''}`}>
                            <div className="product-image text-center">
                                <Link to="/product">
                                    <img className="img-thumbnail img-fluid p-4" style={{ maxHeight: "225px" }} src={`/img/items/products/${product.image}`} alt={product.name} />
                                </Link>
                                <p className="like text-decoration-none" onClick={handleWishlistClick}>
                                    <i className="fa-regular fa-heart"></i>
                                </p>
                                <div className="label">{isOutOfStock ? "Out Of Stock" : `Save ${product.discount}%`}</div>
                            </div>
                            <div className="card-body product-body px-3">
                                <div className="d-flex flex-col gap-0 align-items-sm-start align-items-center ">
                                    <Link className="category-name category-link" to="/shop">{product.category}</Link>
                                    <Link className="card-title category-link font-black" to="/product">
                                        <h6 className="not-link text-decoration-none mb-0">{product.name}</h6>
                                    </Link>
                                    <div className="rating-section mb-sm-0 mb-2">
                                        <div className="ratings">
                                            {[...Array(5)].map((_, index) => (
                                                <span key={index} className={`fa fa-star ${index < product.rating ? 'checked' : ''}`}></span>
                                            ))}
                                        </div>
                                        <div className="review-count ps-1">({product.reviews})</div>
                                    </div>
                                </div>
                                <div className="d-flex flex-sm-row flex-column justify-content-sm-between justify-content-center align-items-sm-end mt-sm-2  align-items-center gap-sm-0 gap-2">
                                    <div>
                                        <span className="price">₹{product.price}</span>
                                        <span className="striked-price">₹{product.salePrice}</span>
                                    </div>
                                    {isOutOfStock ? (
                                        <button className="primary-btn order-link mt-sm-1" disabled>
                                            <i className="fa-solid fa-cart-shopping pe-2"></i>Add
                                        </button>
                                    ) : (
                                        <Link className="primary-btn order-link mt-sm-1" to="/cart">
                                            <i className="fa-solid fa-cart-shopping pe-2"></i>Add
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            <div className="d-flex justify-content-end">
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                            <li className="page-item active">
                                <button className="page-link primary-bg" >1</button>
                            </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default ProductList;
