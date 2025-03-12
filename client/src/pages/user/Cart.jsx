import React, { useState } from "react";

const Cart = () => {
  const shippingCharge = 50;
  const [cart, setCart] = useState([
    {
      productId: 1,
      productName: "Product 1",
      productImage: "product1.jpg",
      price: 500,
      quantity: 2,
      subtotal: 1000,
    },
    {
      productId: 2,
      productName: "Product 2",
      productImage: "product2.jpg",
      price: 300,
      quantity: 1,
      subtotal: 300,
    },
    {
      productId: 3,
      productName: "Product 3",
      productImage: "product3.jpg",
      price: 700,
      quantity: 1,
      subtotal: 700,
    },
  ]);

  const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const finalTotal = total + shippingCharge;

  return (<>
    <div className="container sitemap cart-table">
      <p className="my-5">
        <a href="index.html" className="text-decoration-none dim link">
          Home /
        </a>{" "}
        Cart
      </p>
      <table className="table cart-table text-nowrap">
      <thead>
        <tr className="heading">
          <td>Product</td>
          <td className="text-center" >Price</td>
          <td>Quantity</td>
          <td className="text-center" >Subtotal</td>
          <td className="text-center" >Actions</td>
        </tr>
      </thead>
      <tbody>
        {cart.map((product) => (
          <tr key={product.productId}>
            <td className="text-start">
              <img
                src={`img/items/products/${product.productImage}`}
                alt={product.productName}
                className="image-item d-inline-block"
              />
              <div className="d-inline-block">{product.productName}</div>
            </td>
            <td>₹{product.price}</td>
            <td>
              <div className="d-flex justify-content-center qty-mod">
                <button className="number-button qty-minus">-</button>
                <input type="number" name="quantity" value={product.quantity} readOnly />
                <button className="number-button qty-plus">+</button>
                <input type="hidden" name="product_id" value={product.productId} />
              </div>
            </td>
            <td>₹{product.subtotal}</td>
            <td>
              <button
                className="primary-btn delete-btn"
                href={`php/remove-from-cart.php?product_id=${product.productId}`}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      {/* <div className="container mb-5">
        <div className="d-flex justify-content-between align-items-center cart-page mb-5">
          <a className="btn-msg px-sm-4 py-sm-2 px-2 py-1 mt-2" href="shop.html">
            Return to shop
          </a>
          <div className="flex flex-col">
            <div className="d-flex justify-content-end align-items-center not-hidden">
              <input
                className="search-input"
                type="search"
                placeholder="Add offer code"
                size="25"
              />
              <button className="primary-btn">Apply</button>
            </div>
            <div id="err" style={{ color: "red" }}>
              This offer is not available at the moment.
            </div>
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col-md-5 col-sm-7">
            <div className="bold-border p-4">
              <h5 className="mb-3">Cart Total</h5>
              <div className="d-flex align-items-center p-2">
                <div>Subtotal:</div>
                <div className="price">₹{total}</div>
              </div>
              <div className="my-2 line"></div>
              <div className="d-flex align-items-center p-2">
                <div>Shipping:</div>
                <div className="price">₹{shippingCharge}</div>
              </div>
              <div className="my-2 line"></div>
              <div className="d-flex align-items-center p-2">
                <div>Total:</div>
                <div className="price" id="total">₹{finalTotal}</div>
              </div>
              <div className="d-flex justify-content-center w-100 mt-3">
                <button className="btn-msg checkout-link text-nowrap">
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
    <div className="container mb-5">
    <div className="d-flex justify-content-between align-items-center cart-page mb-5">
        <a className="btn-msg px-sm-4 py-sm-2 px-2 py-1 mt-2" href="shop.php">Return to shop</a>
        <div className="flex flex-col">
            <div className="d-flex justify-content-end align-items-center not-hidden">
                <form className="d-flex justify-content-end" action="cart.php" method="post" >
                    <input className=" search-input" type="search" placeholder="Add offer code" size="25" name="offer_code" id="offerCodeText" />
                    <button className="primary-btn" type="submit" name="apply">Apply</button>
                </form>
            </div>
            <div id="err"></div>
        </div>
    </div>
    <div className="row justify-content-end">
        <div className="col-md-5 col-sm-7">
            <div className="bold-border p-4">
                <form action="cart.php" method="post">
                    <h5 className="mb-3">Cart Total</h5>
                    <div className="d-flex align-items-center p-2">
                        <div>Subtotal:</div>
                        <div className="price">₹500.00</div>
                    </div>
                    <div className="my-2 line"></div>
                    <div className="d-flex align-items-center p-2">
                        <div>Shipping:</div>
                        <div className="price">₹50.00</div>
                    </div>
                    <div id="discount-section">

                    </div>
                    <div className="my-2 line"></div>
                    <div className="d-flex align-items-center p-2">
                        <div>Total:</div>
                        <div className="price" id="total">₹550</div>
                    </div>
                    <div className="d-flex justify-content-center w-100 mt-3">
                        <input type="submit" className="btn-msg checkout-link text-nowrap" name="checkout" value="Proceed to checkout" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</>
  );
};

export default Cart;