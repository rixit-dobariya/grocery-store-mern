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
			<div className="container cart-table">
				<h2 className="my-5">Cart</h2>
				<table className="table cart-table text-nowrap">
					<thead>
						<tr className="heading">
							<td>Product</td>
							<td className="text-center">Price</td>
							<td>Quantity</td>
							<td className="text-center">Subtotal</td>
							<td className="text-center">Actions</td>
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
		if (!offerCode.trim()) {
			setError("Please enter an offer code!");
		} else {
			setError("");
			toast.success("Offer code applied successfully!");
		}
	};

	return (
		<div className="container mb-5">
			<div className="d-flex justify-content-between align-items-center cart-page mb-5">
				<Link
					className="btn-msg px-sm-4 py-sm-2 px-2 py-1 mt-2"
					to="/shop"
				>
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
									onChange={(e) =>
										setOfferCode(e.target.value)
									}
								/>
								<button className="primary-btn" type="submit">
									Apply
								</button>
							</div>
							{error && (
								<div className="text-danger mt-1">{error}</div>
							)}
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
