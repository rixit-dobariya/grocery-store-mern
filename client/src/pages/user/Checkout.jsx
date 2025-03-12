import React, { useState } from "react";

const Checkout = () => {
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const cartItems = [
    { id: 1, name: "Product 1", image: "product1.jpg", price: 500, quantity: 2 },
    { id: 2, name: "Product 2", image: "product2.jpg", price: 300, quantity: 1 },
  ];

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

  const totalPay = {
    subtotal: 1300,
    shipping_charge: 50,
    discount_amount: 100,
    total: 1250,
  };

  const toggleBillingForm = () => {
    setShowBillingForm(!showBillingForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAddress || !selectedPayment) {
      alert("Please select an address and payment mode");
      return;
    }
    alert("Order placed successfully!");
  };

  return (
    <div>
      <div className="container sitemap">
        <p>
          <a href="index.php" className="text-decoration-none dim link">Home /</a>
          <a href="cart.php" className="text-decoration-none dim link">Cart /</a>
          Checkout
        </p>
      </div>
      <div className="container">
        <div className="row g-5">
          <div className="col-md-6">
            <button onClick={toggleBillingForm} className="btn btn-success mt-2">Add New Address</button>
            {showBillingForm && (
              <form id="billingForm" className="billing-details form" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <h2>Billing Details</h2>
                  <div className="row gx-2 gy-3">
                    <div className="col-12 col-sm-6">
                      <label>First Name<span className="required">*</span></label>
                      <input type="text" placeholder="First Name" />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label>Last Name<span className="required">*</span></label>
                      <input type="text" placeholder="Last Name" />
                    </div>
                    <div className="col-12">
                      <label>Street Address<span className="required">*</span></label>
                      <textarea rows="2" placeholder="Street Address"></textarea>
                    </div>
                    <div className="col-12 col-sm-6">
                      <label>City<span className="required">*</span></label>
                      <input type="text" placeholder="City" />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label>State<span className="required">*</span></label>
                      <input type="text" placeholder="State" />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label>Pin Code<span className="required">*</span></label>
                      <input type="text" placeholder="Pin Code" />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label>Phone<span className="required">*</span></label>
                      <input type="text" placeholder="Phone Number" />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-success">Save Address</button>
              </form>
            )}
            <h5>Select Shipping Address</h5>
            <div className="d-flex flex-wrap">
              {addresses.map((addr) => (
                <div key={addr.id} className="col-md-6 mb-4 border p-3 address-box">
                  <label>
                    <input type="radio" name="address" value={addr.id} onChange={() => setSelectedAddress(addr.id)} />
                    <span>{addr.fullName}, {addr.phone}, {addr.address}, {addr.city}, {addr.state} - {addr.pincode}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6 checkout">
            {cartItems.map((item) => (
              <div key={item.id} className="d-flex align-items-center p-2">
                <img src={`img/items/products/${item.image}`} className="checkout-image" alt="" />
                <div className="item-name ms-2">{item.name} x {item.quantity}</div>
                <div className="price">₹{item.price.toFixed(2)}</div>
              </div>
            ))}
            <div className="p-2">Subtotal: ₹{totalPay.subtotal.toFixed(2)}</div>
            <div className="p-2">Shipping: ₹{totalPay.shipping_charge.toFixed(2)}</div>
            <div className="p-2">Discount: -₹{totalPay.discount_amount.toFixed(2)}</div>
            <div className="p-2">Total: ₹{totalPay.total.toFixed(2)}</div>
            <div className="p-2">Payment Mode:</div>
            <div className="p-2">
              <label><input type="radio" name="pay-mode" value="COD" onChange={() => setSelectedPayment("COD")} /> Cash On Delivery</label>
            </div>
            <div className="p-2">
              <label><input type="radio" name="pay-mode" value="Online" onChange={() => setSelectedPayment("Online")} /> Online</label>
            </div>
            <button onClick={handleSubmit} className="btn-msg mt-2">Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
