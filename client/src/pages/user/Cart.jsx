import React, { useState } from "react";
import {  toast } from "react-toastify";
import { Link } from "react-router-dom";

const Cart = () => {
	const shippingCharge = 50;
	const subtotal = 500; // Static subtotal
	const total = subtotal + shippingCharge; // Static total

	const [cart, setCart] = useState([
		{
			id: 1,
			name: "1 KG Apple",
			price: 500,
			image: "img/items/products/66ee9001ceeaeapple.webp",
			quantity: 1,
		},
		{
			id: 2,
			name: "Cookie Cake",
			price: 500,
			image: "img/items/products/cookiecake.webp",
			quantity: 1,
		},
		{
			id: 3,
			name: "Oreo",
			price: 500,
			image: "img/items/products/oreo.webp",
			quantity: 1,
		},
	]);

	const handleQuantityChange = (id, amount) => {
		setCart((prevCart) =>
			prevCart.map((item) =>
				item.id === id
					? { ...item, quantity: Math.max(1, item.quantity + amount) }
					: item
			)
		);
	};

	return (
		<>
				<div className="container sitemap mt-5">
				<p>
					<Link
						to="/"
						className="text-decoration-none dim link"
					>
						Home /
					</Link>{" "}
					Cart
				</p>
				<table className="table cart-table text-nowrap mt-5">
					<thead>
						<tr className="heading ">
							<th>Product</th>
							<th className="text-center">Price</th>
							<th>Quantity</th>
							<th className="text-center">Subtotal</th>
							<th className="text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{cart.map((product) => (
							<CartItem
								key={product.id}
								product={product}
								onQuantityChange={handleQuantityChange}
							/>
						))}
					</tbody>
				</table>
			</div>
			<CartActions />
			<CartSummary
				subtotal={subtotal}
				shippingCharge={shippingCharge}
				total={total}
			/>
		</>
	);
};

const CartItem = ({ product, onQuantityChange }) => {
	const handleDelete = () => {
		toast.success("Product removed from cart!", { position: "top-right" });
	};
	return (
		<tr>
			<td className="text-start">
				<img
					src={`${product.image}`}
					alt={product.name}
					className="image-item d-inline-block"
				/>
				<div className="d-inline-block">{product.name}</div>
			</td>
			<td>₹{product.price}</td>
			<td>
				<div className="d-flex justify-content-center qty-mod">
					<button
						className="number-button qty-minus"
						onClick={() => onQuantityChange(product.id, -1)}
					>
						-
					</button>
					<input type="number" value={product.quantity} readOnly />
					<button
						className="number-button qty-plus"
						onClick={() => onQuantityChange(product.id, 1)}
					>
						+
					</button>
				</div>
			</td>
			<td>₹{product.price * product.quantity}</td>
			<td>
				<button
					className="primary-btn delete-btn"
					onClick={handleDelete}
				>
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
                        <form className="d-flex justify-content-end flex-column w-100" onSubmit={handleApply}>
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
							<Link
								to="/checkout"
								className="btn-msg checkout-link text-nowrap">
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
