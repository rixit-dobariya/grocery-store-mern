import React from 'react'

const WishlistTable = () => {
  return (
    <table className="table cart-table text-nowrap">
        <thead>
            <tr className="heading">
                <td>Product</td>
                <td>Price</td>
                <td>Actions</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <img src="img/items/products/sample.jpg" alt="Sample Product" className="image-item d-inline-block" />
                    <div className="d-inline-block">Sample Product</div>
                </td>
                <td>₹500</td>
                <td>
                    <a className="primary-btn update-btn" href="#">Add to cart</a>
                    <a className="primary-btn delete-btn ms-2" href="#">Delete</a>
                </td>
            </tr>
        </tbody>
    </table>
  )
}

export default WishlistTable