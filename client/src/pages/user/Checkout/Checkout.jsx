import React, { useState } from "react";
import BillingAddressForm from "./BillingAddressForm";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


const Checkout = () => {
	const [showBillingForm, setShowBillingForm] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [selectedPayment, setSelectedPayment] = useState(null);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};
        if (!selectedAddress) validationErrors.address = "Please select an address.";
        if (!selectedPayment) validationErrors.payment = "Please select a payment method.";
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        toast.success("Order placed successfully!", "Success");
    };

	const addresses = [
		{
			id: 1,
			fullName: "John Doe",
			phone: "1234567890",
			address: "123 Main Street",
			city: "New York",
			state: "NY",
			pincode: "10001",
		},
		{
			id: 2,
			fullName: "Jane Doe",
			phone: "9876543210",
			address: "456 Elm Street",
			city: "Los Angeles",
			state: "CA",
			pincode: "90001",
		},
	];


	const toggleBillingForm = () => {
		setShowBillingForm(!showBillingForm);
	};

	return (
		<>
			<div className="container sitemap">
                <p className="mt-5">
                    <Link to="/" className="text-decoration-none dim link">
                        Home /
                    </Link>
                    <Link to="/cart" className="text-decoration-none dim link">
                        Cart /
                    </Link>
                    Checkout
                </p>
            </div>
			<div className="container">
				<div className="row g-5">
					<div className="col-md-6">
						{showBillingForm && <BillingAddressForm />}
						<div
							className="card border-0"
							style={{ marginTop: "20px" }}
						>
							<div className="row">
								<form action="" method="post" className="form">
									<div className="d-flex justify-content-between align-content-center mb-3">
										<h5 className="mt-2">
											Select Shipping Address
										</h5>
										<div className="d-flex justify-content-end">
											<button
												type="button"
												id="add-new-address"
												onClick={toggleBillingForm}
												className="btn btn-success mt-2"
											>
												Add New Address
											</button>
										</div>
									</div>
									<AddressList addresses={addresses} setSelectedAddress={setSelectedAddress} selectedAddress={selectedAddress} />
                                    {errors.address && <p className="text-danger">{errors.address}</p>}
                                </form>
							</div>
						</div>
					</div>
					<CheckoutSummary 
                        setSelectedPayment = {setSelectedPayment} 
                        selectedPayment={selectedPayment}
                        handleSubmit={handleSubmit}
                        errors={errors}
                     />
				</div>
			</div>
		</>
	);
};

const AddressList = ({ addresses,setSelectedAddress,selectedAddress }) => {

	const handleAddressChange = (event) => {
		setSelectedAddress(Number(event.target.value)); // Convert to number if needed
	};

	return (
		<div className="row g-0 gap-0">
			{addresses.map((address) => {
				const fullAddress = `${address.fullName},\n${address.phone},\n${address.address},\n${address.city},\n${address.state} - ${address.pincode}`;

				return (
					<div className="col-md-6 mb-4" key={address.id}>
						<div
							className={`border p-3 h-100 d-flex flex-column justify-content-between address-box ${
								selectedAddress === address.id ? "selected" : ""
							}`}
						>
							<label
								className="d-flex flex-column"
								style={{ cursor: "pointer" }}
							>
								<input
									type="radio"
									name="add"
									value={address.id}
									className="d-none address-radio"
									checked={selectedAddress === address.id}
									onChange={handleAddressChange}
								/>
								<span style={{ whiteSpace: "pre-line" }}>
									{fullAddress}
								</span>
							</label>
						</div>
					</div>
				);
			})}
		</div>
	);
};

const CheckoutSummary = ({setSelectedPayment, selectedPayment, handleSubmit, errors}) => {

	// Static product data
	const products = [
		{
			id: 1,
			productName: "1 KG Apple",
			price: 500,
			productImage: "img/items/products/66ee9001ceeaeapple.webp",
			quantity: 1,
		},
		{
			id: 2,
			productName: "Cookie Cake",
			price: 500,
			productImage: "img/items/products/cookiecake.webp",
			quantity: 1,
		},
		{
			id: 3,
			productName: "Oreo",
			price: 500,
			productImage: "img/items/products/oreo.webp",
			quantity: 1,
		},
	];

	// Static pricing details
	const subtotal = 1299.48;
	const shippingCharge = 50.0;
	const discountAmount = 100.0;
	const total = subtotal + shippingCharge - discountAmount;

	const handlePaymentChange = (event) => {
		setSelectedPayment(event.target.value);
	};

	return (
		<div className="col-md-6 font-black checkout">
			<div className="mb-2">
				{products.map((product) => (
					<div
						className="d-flex align-items-center p-2"
						key={product.id}
					>
						<img
							src={product.productImage}
							className="checkout-image h-100"
							alt={product.productName}
						/>
						<div className="item-name ms-2">
							{product.productName} x {product.quantity}
						</div>
						<div className="price">₹{product.price.toFixed(2)}</div>
					</div>
				))}
			</div>

			<div className="d-flex align-items-center p-2">
				<div>Subtotal:</div>
				<div className="price">₹{subtotal.toFixed(2)}</div>
			</div>

			<div className="my-2 line"></div>

			<div className="d-flex align-items-center p-2">
				<div>Shipping:</div>
				<div className="price">₹{shippingCharge.toFixed(2)}</div>
			</div>

			{discountAmount > 0 && (
				<>
					<div className="my-2 line"></div>
					<div className="d-flex align-items-center p-2">
						<div>Discount:</div>
						<div className="price">
							-₹{discountAmount.toFixed(2)}
						</div>
					</div>
				</>
			)}

			<div className="my-2 line"></div>

			<div className="d-flex align-items-center p-2">
				<div>Total:</div>
				<div className="price">₹{total.toFixed(2)}</div>
			</div>

			<div className="my-2 line"></div>

			<div className="p-2">
				<div className="mb-1">Payment Mode:</div>
				<div className="mb-1">
					<label>
						<input
							type="radio"
							name="pay-mode"
							value="COD"
							checked={selectedPayment === "COD"}
							onChange={handlePaymentChange}
							className="me-1"
						/>
						Cash On Delivery
					</label>
				</div>
				<div>
					<label>
						<input
							type="radio"
							name="pay-mode"
							value="Online"
							checked={selectedPayment === "Online"}
							onChange={handlePaymentChange}
							className="me-1"
						/>
						Online
					</label>
				</div>
			</div>
            {errors.payment && <p className="text-danger">{errors.payment}</p>}
			<div id="payModeError" className="error"></div>

			<div className="d-flex justify-content-end">
				<button
					className="btn-msg mt-2"
					onClick={handleSubmit}
				>
					Place Order
				</button>
			</div>
		</div>
	);
};
export default Checkout;
