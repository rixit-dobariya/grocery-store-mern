import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductList = ({ products }) => {
  const handleWishlistClick = () => {
    toast.success("Product added to wishlist successfully!");
  };

  return (
    <div className="row justify-content-start align-items-stretch">
      {!products || products.length === 0 ? (
        <p className="text-center">No products found</p>
      ) : (
        products.map((product) => {
          const isOutOfStock = product.stock <= 0;
          return (
            <div key={product._id} className="col-lg-3 col-md-4 col-6 gap p-2 mt-2">
              <div className={`card h-100 ${isOutOfStock ? 'disabled-card' : ''}`}>
                <div className="product-image text-center">
                  <Link to={`/product/${product._id}`}>
                    <img className="img-thumbnail img-fluid p-4" style={{ maxHeight: "225px" }} src={product.productImage} alt={product.productName} />
                  </Link>
                  <p className="like text-decoration-none" onClick={handleWishlistClick}>
                    <i className="fa-regular fa-heart"></i>
                  </p>
                  <div className="label">{isOutOfStock ? "Out Of Stock" : `Save ${product.discount}%`}</div>
                </div>
                <div className="card-body product-body px-3">
                  <div className="d-flex flex-col gap-0 align-items-sm-start align-items-center">
                    <Link className="category-name category-link" to="/shop">{product.categoryId?.name || "Category"}</Link>
                    <Link className="card-title category-link font-black" to={`/product/${product._id}`}>
                      <h6 className="not-link text-decoration-none mb-0">{product.productName}</h6>
                    </Link>
                    <div className="rating-section mb-sm-0 mb-2">
                    <div className="ratings">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={`fa fa-star ${product.averageRating > i ? "checked" : ""}`}></span>
                            ))}
                        </div>
                        <div className="review-count ps-1">({product.totalReviews || 0})</div>
                    </div>
                  </div>
                  <div className="d-flex flex-sm-row flex-column justify-content-sm-between justify-content-center align-items-sm-end mt-sm-2 align-items-center gap-sm-0 gap-2">
                    <div>
                      <span className="price">₹{product.costPrice}</span>
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
        })
      )}
    </div>
  );
};

export default ProductList;
