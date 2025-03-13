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

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleWishlistClick = () => {
        toast.success("Product added to wishlist successfully!");
    };

    return (
        <div className="row justify-content-start align-items-stretch">
            {products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map((product) => {
                const isOutOfStock = product.stock <= 0;
                return (
                    <div key={product.id} className="col-md-3 gap col-sm-4 p-2 col-6 mt-2">
                        <div className={`card h-100 ${isOutOfStock ? 'disabled-card' : ''}`}>
                            <div className="product-image">
                                <Link to="/product">
                                    <img className="img-thumbnail img-fluid p-4" style={{ height: "300px" }} src={`/img/items/products/${product.image}`} alt={product.name} />
                                </Link>
                                <p className="like text-decoration-none" onClick={handleWishlistClick}>
                                    <i className="fa-regular fa-heart"></i>
                                </p>
                                <div className="label">{isOutOfStock ? "Out Of Stock" : `Save ${product.discount}%`}</div>
                            </div>
                            <div className="card-body product-body px-3">
                                <Link className="category-name category-link" to="/shop">{product.category}</Link>
                                <Link className="card-title category-link font-black" to="/product">
                                    <h6 className="not-link text-decoration-none">{product.name}</h6>
                                </Link>
                                <div className="rating-section">
                                    <div className="ratings">
                                        {[...Array(5)].map((_, index) => (
                                            <span key={index} className={`fa fa-star ${index < product.rating ? 'checked' : ''}`}></span>
                                        ))}
                                    </div>
                                    <div className="review-count ps-1">({product.reviews})</div>
                                </div>
                                <div className="d-flex justify-content-between align-items-end mt-sm-2 flex-sm-column flex-row align-items-sm-center flex-lg-row">
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
                        {currentPage > 1 && (
                            <li className="page-item">
                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                            </li>
                        )}
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                            </li>
                        ))}
                        {currentPage < totalPages && (
                            <li className="page-item">
                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default ProductList;
