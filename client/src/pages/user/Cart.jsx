// src/components/Cart.js
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext"; // Importing AuthContext

const Cart = () => {
    const shippingCharge = 50;
    const { cartCount, updateCartCount } = useAuth(); // Accessing cart count and update method from AuthContext
    const [cart, setCart] = useState([]);

    // Fetch cart items dynamically (replace the API endpoint with your own)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        if (!user || !user._id) {
            toast.error("User not found in local storage");
            return;
        }
        
        axios
            .get(`http://localhost:8000/cart/${user._id}`)  // Replace with your cart API endpoint
            .then((response) => {
                console.log(response.data);
                setCart(response.data.items);  // Ensure the data structure is correct
                updateCartCount(response.data.items.length);  // Update the global cart count
            })
            .catch((error) => toast.error("Failed to fetch cart data"));
    }, [updateCartCount]);

    const handleQuantityChange = (id, amount) => {
        const user = JSON.parse(localStorage.getItem('user'));

        setCart((prevCart) =>
            prevCart.map((item) =>
                item.productId._id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                    : item
            )
        );

        const updatedItem = cart.find(item => item.productId._id === id);
        axios
            .put(`http://localhost:8000/cart/${user._id}`, {
                productId: id,
                quantity: updatedItem.quantity + amount
            })
            .then(() => {
                toast.success("Cart updated successfully");
                updateCartCount(cart.length); // Ensure cart count is updated correctly
            })
            .catch(() => {
                toast.error("Failed to update cart");
            });
    };

    const handleDelete = (id) => {
        const user = JSON.parse(localStorage.getItem('user'));

        axios
            .delete(`http://localhost:8000/cart/${user._id}`, { data: { productId: id } })
            .then(() => {
                toast.success("Product removed from cart!", { position: "top-right" });
                setCart(cart.filter(item => item.productId._id !== id)); // Remove the item from the state
                updateCartCount(cart.length - 1);  // Decrease global cart count when item is removed
            })
            .catch(() => {
                toast.error("Failed to remove product!");
            });
    };

    const subtotal = cart.reduce((total, item) => total + (item.productId.price * item.quantity), 0);
    const total = subtotal + shippingCharge;

    return (
        <div className="container sitemap mt-5">
            <p>
                <Link to="/" className="text-decoration-none dim link">
                    Home /
                </Link>{" "}
                Cart
            </p>
            <div className="table-responsive">
                <table className="table cart-table text-nowrap mt-5">
                    <thead>
                        <tr className="heading text-center">
                            <th className="text-start">Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((product) => (
                            <CartItem
                                key={product.productId._id}
                                product={product}
                                onQuantityChange={handleQuantityChange}
                                onDelete={handleDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <CartActions />
            <CartSummary subtotal={subtotal} shippingCharge={shippingCharge} total={total} />
        </div>
    );
};

const CartItem = ({ product, onQuantityChange, onDelete }) => {
    // Ensure salePrice and discount are valid numbers
    const salePrice = parseFloat(product.productId.salePrice) || 0;  // Default to 0 if invalid
    const discount = parseFloat(product.productId.discount) || 0;  // Default to 0 if invalid

    // Calculate the discounted price, ensuring we avoid NaN
    let discountedPrice = salePrice - (salePrice * discount / 100);

    return (
        <tr>
            <td className="text-start">
                <img
                    src={product.productId.productImage}
                    alt={product.productId.productName}
                    className="image-item d-inline-block"
                />
                <div className="d-inline-block">{product.productId.productName}</div>
            </td>
            <td className="text-center">₹{discountedPrice.toFixed(2)}</td> {/* Round to 2 decimal places */}
            <td>
                <div className="d-flex justify-content-center qty-mod">
                    <button
                        className="number-button qty-minus rounded-start"
                        onClick={() => onQuantityChange(product.productId._id, -1)}
                    >
                        <i className="fas fa-minus"></i>
                    </button>
                    <input
                        type="text"
                        value={product.quantity}
                        readOnly
                        className="text-center border-start-0 border-end-0"
                        style={{
                            width: "60px",
                            border: "1px solid #dee2e6",
                            outline: "none",
                        }}
                    />
                    <button
                        className="number-button qty-plus rounded-end"
                        onClick={() => onQuantityChange(product.productId._id, 1)}
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </td>
            <td className="text-center">₹{(discountedPrice * product.quantity).toFixed(2)}</td> {/* Round to 2 decimal places */}
            <td className="text-center">
                <button className="primary-btn delete-btn" onClick={() => onDelete(product.productId._id)}>
                    Remove
                </button>
            </td>
        </tr>
    );
};

const CartActions = () => {
    const [offerCode, setOfferCode] = useState("");
    const [error, setError] = useState("");

    const handleApply = (e) => {
        e.preventDefault();
        if (!validateOfferCode()) return; // Stop execution if validation fails
        toast.success("Offer code applied successfully!");
    };

    const handleChange = (e) => {
        setOfferCode(e.target.value);
        validateOfferCode(e.target.value); // Validate dynamically as user types
    };

    const validateOfferCode = (code = offerCode) => {
        if (!code.trim()) {
            setError("Please enter an offer code!");
            return false; // Indicate validation failure
        }
        setError(""); // Clear error if valid
        return true; // Indicate validation success
    };

    return (
        <div className="container mb-5">
            <div className="d-flex justify-content-between align-items-center cart-page mb-5">
                <Link className="btn-msg px-sm-4 py-sm-2 px-2 py-1 mt-2" to="/shop">
                    Return to shop
                </Link>
                <div className="flex flex-col m-0">
                    <div className="d-flex justify-content-end align-items-center not-hidden">
                        <form
                            className="d-flex justify-content-end flex-column w-100"
                            onSubmit={handleApply}
                        >
                            <div className="d-flex">
                                <input
                                    className="search-input"
                                    type="search"
                                    placeholder="Add offer code"
                                    size="25"
                                    name="offer_code"
                                    id="offerCodeText"
                                    value={offerCode}
                                    onChange={handleChange}
                                />
                                <button className="primary-btn" type="submit">
                                    Apply
                                </button>
                            </div>
                            {error && <div className="text-danger mt-1">{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartSummary = ({ subtotal, shippingCharge, total }) => {
    return (
        <div className="container mb-5">
            <div className="row justify-content-end">
                <div className="col-md-5 col-sm-7">
                    <div className="bold-border p-4">
                        <h5 className="mb-3">Cart Total</h5>
                        <div className="d-flex align-items-center p-2">
                            <div>Subtotal:</div>
                            <div className="price">₹{subtotal}</div>
                        </div>
                        <div className="my-2 line"></div>
                        <div className="d-flex align-items-center p-2">
                            <div>Shipping:</div>
                            <div className="price">₹{shippingCharge}</div>
                        </div>
                        <div className="my-2 line"></div>
                        <div className="d-flex align-items-center p-2">
                            <div>Total:</div>
                            <div className="price">₹{total}</div>
                        </div>
                        <div className="d-flex justify-content-center w-100 mt-3">
                            <Link to="/checkout" className="btn-msg checkout-link text-nowrap">
                                Proceed to checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
