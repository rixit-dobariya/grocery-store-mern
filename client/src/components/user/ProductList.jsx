import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";  // Import the AuthContext

const ProductList = ({ products }) => {
  const { user, updateCartCount, updateWishlistCount } = useAuth();  // Access the auth context

  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleWishlistClick = async (productId) => {
    if (!user) {
      toast.error("Please log in to add items to your wishlist.");
      return;
    }

    setIsAddingToWishlist(true);
    try {
      const response = await axios.post(`http://localhost:8000/wishlist/${user._id}/add`, { productId });
      toast.success("Product added to wishlist successfully!");

      // Update wishlist count in context
      if (response.data?.wishlistCount) {
        updateWishlistCount(response.data.wishlistCount);
      }
    } catch (error) {
      toast.error("Failed to add product to wishlist.");
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  const handleAddToCartClick = async (productId) => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    setIsAddingToCart(true);
    try {
      // Updated API call to correctly integrate with your backend
      const response = await axios.post(`http://localhost:8000/cart`, { 
        userId: user._id, 
        productId, 
        quantity: 1 
      });
      
      toast.success("Product added to cart successfully!");

      // Update cart count in context
      if (response.data?.items?.length) {
        updateCartCount(response.data.items.length);
      }
    } catch (error) {
      toast.error("Failed to add product to cart.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="row justify-content-start align-items-stretch">
      {!products || products.length === 0 ? (
        <p className="text-center">No products found</p>
      ) : (
        products.map((product) => {
          const isOutOfStock = product.stock <= 0;

          // Calculate the discounted price based on the discount percentage
          const discountedPrice = (product.salePrice - (product.salePrice * product.discount) / 100).toFixed(2);

          return (
            <div key={product._id} className="col-lg-3 col-md-4 col-6 gap p-2 mt-2">
              <div className={`card h-100 ${isOutOfStock ? 'disabled-card' : ''}`}>
                <div className="product-image text-center">
                  <Link to={`/product/${product._id}`}>
                    <img className="img-thumbnail img-fluid p-4" style={{ maxHeight: "225px" }} src={product.productImage} alt={product.productName} />
                  </Link>
                  <p className="like text-decoration-none" onClick={() => handleWishlistClick(product._id)}>
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
                      {/* Display the discounted price as the real price */}
                      <span className="price">₹{discountedPrice}</span>
                      {/* Display the original price as striked */}
                      <span className="striked-price">₹{product.salePrice}</span>
                    </div>
                    {isOutOfStock ? (
                      <button className="primary-btn order-link mt-sm-1" disabled>
                        <i className="fa-solid fa-cart-shopping pe-2"></i>Add
                      </button>
                    ) : (
                      <>
                        <button
                          className="primary-btn order-link mt-sm-1"
                          onClick={() => handleAddToCartClick(product._id)}
                          disabled={isAddingToCart}
                        >
                          <i className="fa-solid fa-cart-shopping pe-2"></i>
                          {isAddingToCart ? "Adding..." : "Add"}
                        </button>
                      </>
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
