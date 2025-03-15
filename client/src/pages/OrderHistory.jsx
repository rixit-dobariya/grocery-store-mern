import React from "react";
import { Link } from "react-router-dom";

import OrdersTable from "../components/user/OrdersTable";

const OrderHistory = () => {

  return (
    <div className="container cart-table">
      <p class="my-5"><Link to="/" class="text-decoration-none dim link ">Home /</Link> Order History</p>
        <OrdersTable />
    </div>
  );
};

export default OrderHistory;
