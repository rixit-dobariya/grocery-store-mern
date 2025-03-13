import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const OrderDetails = ({ order = {
    orderId: "123456",
    status: "Pending",
    placedOn: "01/03/2025",
    total: 1500,
    shippingCharge: 50,
    firstName: "John",
    lastName: "Doe",
    mobileNo: "9876543210",
    email: "johndoe@example.com",
    paymentMode: "Credit Card"
}, billingAddress={
    fullName: "John Doe",
    address: "123 Baker Street",
    city: "New York",
    state: "NY",
    pincode: "10001",
    phone: "9876543210"
}, products=[
    {
        productId: 1,
        productName: "Apple 1 KG",
        productImage: "img/items/products/66ee9001ceeaeapple.webp",
        quantity: 2,
        price: 500
    },
    {
        productId: 2,
        productName: "Cookie Cake",
        productImage: "img/items/products/cookiecake.webp",
        quantity: 1,
        price: 500
    }
] }) => {
    const handleReorder = () => {
        toast.success("Re-order placed successfully!");
    };
    return (
        <div className="container sitemap">
            <p className="my-5">
                <Link to="/" className="text-decoration-none dim link">Home /</Link>
                <Link to="/order-history" className="text-decoration-none dim link">Orders /</Link>
                Order# {order.orderId}
            </p>
            <div className="row order-border p-3 mb-4 m-1">
                <div className="col-6">
                    <h4 className="mb-2">Order# {order.orderId}</h4>
                    <div className="order-status mb-3">{order.status}</div>
                    <div className="order-date">Placed on: {order.placedOn}</div>
                </div>
                <div className="col-6 d-flex justify-content-end align-items-start">
                    <button className="primary-btn" onClick={handleReorder}>Re-order</button>
                </div>
            </div>
            <div className="row align-items-stretch mb-4 gap-md-0 m-1">
                <div className="col-md-4 col-sm-6 col-12 ps-md-0 mb-2">
                    <div className="order-border p-3 h-100">
                        <h5 className="mb-3">Customer & Order</h5>
                        <div className="row customer-details">
                            <div className="col-4">
                                <p>Name</p>
                                <p>Phone</p>
                                <p>Email</p>
                                <p>Payment Terms</p>
                            </div>
                            <div className="col-1">
                                <p>:</p>
                                <p>:</p>
                                <p>:</p>
                                <p>:</p>
                            </div>
                            <div className="col-7">
                                <p>{order.firstName} {order.lastName}</p>
                                <p>+91 {order.mobileNo}</p>
                                <p className="text-break">{order.email}</p>
                                <p>{order.paymentMode}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12 mb-2">
                    <div className="order-border p-3">
                        <h5 className="mb-3">Shipping Address</h5>
                        <address className="address-book">
                            <p>{billingAddress.fullName}</p>
                            <p>Street: {billingAddress.address}</p>
                            <p>City: {billingAddress.city}</p>
                            <p>State: {billingAddress.state}</p>
                            <p>Pin code: {billingAddress.pincode}</p>
                            <p>Phone Number: +91 {billingAddress.phone}</p>
                        </address>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12 mb-2">
                    <div className="order-border p-3">
                        <h5 className="mb-3">Billing Address</h5>
                        <address className="address-book">
                            <p>{billingAddress.fullName}</p>
                            <p>Street: {billingAddress.address}</p>
                            <p>City: {billingAddress.city}</p>
                            <p>State: {billingAddress.state}</p>
                            <p>Pin code: {billingAddress.pincode}</p>
                            <p>Phone Number: +91 {billingAddress.phone}</p>
                        </address>
                    </div>
                </div>
            </div>
            <div className="row order-border py-4 mb-4 order-item-list m-1 m-md-0 cart-table">
                <h5 className="mb-3">Items ordered</h5>
                <div className="row py-3 order-item-list-header mx-0 my-2 text-nowrap">
                    <div className="col-2 p-md-0">Product Image</div>
                    <div className="col-2 p-md-0">Product name</div>
                    <div className="col-2 text-center">Quantity</div>
                    <div className="col-4">Price</div>
                    <div className="col-2 text-center">Total</div>
                </div>
                {products.map((product, index) => (
                    <div className="row m-0 border-bottom" key={index}>
                        <div className="col-2 p-0">
                            <img src={product.productImage} alt={product.productName} className="image-item d-inline-block" />
                        </div>
                        <div className="col-2 p-0">
                            <div className="d-inline-block">{product.productName}</div>
                        </div>
                        <div className="col-2 text-center">{product.quantity}</div>
                        <div className="col-4">₹{product.price.toFixed(2)}</div>
                        <div className="col-2 text-center">₹{(product.price * product.quantity).toFixed(2)}</div>
                    </div>
                ))}
                <div className="row m-0 border-bottom py-3">
                    <div className="col-4 p-0"></div>
                    <div className="col-2 text-center"></div>
                    <div className="col-4 grey">Subtotal</div>
                    <div className="col-2 text-center">₹{(order.total - order.shippingCharge).toFixed(2)}</div>
                </div>
                <div className="row m-0 border-bottom py-3">
                    <div className="col-4 p-0"></div>
                    <div className="col-2 text-center"></div>
                    <div className="col-4 grey">Shipping Charge</div>
                    <div className="col-2 text-center">₹{order.shippingCharge.toFixed(2)}</div>
                </div>
                <div className="row m-0 border-bottom py-3">
                    <div className="col-4 p-0"></div>
                    <div className="col-2 text-center"></div>
                    <div className="col-4 grey bold">Total</div>
                    <div className="col-2 text-center bold">₹{order.total.toFixed(2)}</div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;