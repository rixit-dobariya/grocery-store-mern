import React from 'react';
import { Link } from 'react-router-dom';

const OrdersTable = () => {
  const orders = [
    { id: 12345, date: "2025-03-10", quantity: 2, total: 1000 },
    { id: 12346, date: "2025-03-11", quantity: 1, total: 500 },
    { id: 12347, date: "2025-03-12", quantity: 3, total: 1500 }
  ];

  return (
    <table className="table cart-table text-nowrap">
      <thead>
        <tr className="heading">
          <td>Order ID</td>
          <td>Order Date</td>
          <td>Quantity</td>
          <td>Total Price</td>
          <td>View Orders</td>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.date}</td>
            <td>{order.quantity}</td>
            <td>₹{order.total}.00</td>
            <td>
              <Link className="primary-btn order-link" to="/order">
                View Order
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
