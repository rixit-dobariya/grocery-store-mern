import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const WishlistTable = ({ userId }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist
  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/wishlist/${userId}`);
      setWishlist(res.data.wishlist?.productIds || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error("Failed to load wishlist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchWishlist();
  }, [userId]);

  // Handle delete from wishlist
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/wishlist/${userId}/remove`, {
        data: { productId }
      });
      toast.success("Product removed from wishlist!");
      setWishlist(prev => prev.filter(item => item._id !== productId));
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      toast.error("Failed to remove product.");
    }
  };

  return (
    <>
      <table className="table cart-table text-nowrap">
        <thead>
          <tr className="heading text-center">
            <th className='text-start'>Product</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="3" className="text-center">Loading...</td></tr>
          ) : wishlist.length > 0 ? (
            wishlist.map((item) => (
              <tr key={item._id}>
                <td>
                  <img src={item.productImage} alt={item.productName} className="image-item d-inline-block" />
                  <div className="d-inline-block">{item.productName}</div>
                </td>
                <td>₹{item.salePrice}</td>
                <td>
                  <Link className="primary-btn update-btn" to="/cart">
                    Add to cart
                  </Link>
                  <button className="primary-btn delete-btn ms-2" onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">Your wishlist is empty.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default WishlistTable;
