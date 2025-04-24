import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/orders/active");
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.patch(`http://localhost:8000/orders/${orderId}/delete`);
        Swal.fire("Deleted!", "Order has been deleted.", "success");
        fetchOrders();
      } catch (error) {
        Swal.fire("Error", "Failed to delete order.", "error");
      }
    }
  };

  return (
    <div className="card-body">
      <table className="table border text-nowrap">
        <thead className="table-light">
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Order Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.slice(-6).toUpperCase()}</td>
                <td>
                  <Link to={`/admin/user-details`}>{order.userId?.name}</Link>
                </td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>--</td> {/* You can populate quantity from OrderItems if needed */}
                <td>₹{parseFloat(order.total).toFixed(2)}</td>
                <td>{order.orderStatus}</td>
                <td>
                  <div className="d-flex flex-nowrap">
                    <Link to={`/admin/view-order/${order._id}`} className="btn btn-info btn-sm me-1">
                      View
                    </Link>
                    <Link to={`/admin/update-order/${order._id}`} className="btn btn-primary btn-sm me-1">
                      Edit
                    </Link>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(order._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
