import React from "react";
import { Link } from "react-router-dom";
import WishlistTable from "../../components/user/WishlistTable";

const Wishlist = () => {

  return (
    <div className="container cart-table">
      <p class="my-5"><Link to="/" class="text-decoration-none dim link ">Home /</Link> Wishlist</p>
        <WishlistTable />
    </div>
  );
};

export default Wishlist;
