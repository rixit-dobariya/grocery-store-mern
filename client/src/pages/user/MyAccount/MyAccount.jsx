import React, { useState } from 'react';
import UpdatePasswordForm from './UpdatePasswordForm';
import UpdateProfileForm from './UpdateProfileForm';
import WishlistTable from './WishlistTable';

const MyAccount = () => {
    const [activeTab, setActiveTab] = useState('my-profile');

    return (
        <div>
            <div className="container ">
                <div className="d-flex justify-content-between sitemap mt-5">
                    <p><a href="#" className="text-decoration-none dim link">Home /</a> Account</p>
                    <p>Welcome! <span className="highlight">John</span></p>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-3 p-2 d-flex flex-row flex-sm-column ">
                        <div className="shadow-sm p-4 d-flex heading text-nowrap">
                            <ul className="d-flex flex-row flex-md-column gap-3 heading">
                                <li className={`menu-item js-account mb-0 ${activeTab === 'my-profile' ? 'active' : ''}`} onClick={() => setActiveTab('my-profile')}>My Profile</li>
                                <li className={`menu-item my-orders-main mb-0 ${activeTab === 'all-orders' ? 'active' : ''}`} onClick={() => setActiveTab('all-orders')}>My Orders</li>
                                <li className={`menu-item mb-0 ${activeTab === 'my-wishlist' ? 'active' : ''}`} onClick={() => setActiveTab('my-wishlist')}>My Wishlist</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-md-9 p-2">
                        <div className="shadow-sm p-4">
                            <div id="my-profile" className={activeTab === 'my-profile' ? '' : 'd-none'}>
                                <p className="highlight title">Edit Your Profile</p>
                                <UpdateProfileForm/>
                                <UpdatePasswordForm />
                            </div>
                            <div id="all-orders" className={activeTab === 'all-orders' ? '' : 'd-none'}>
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
                                        <tr>
                                            <td>12345</td>
                                            <td>2025-03-10</td>
                                            <td>2</td>
                                            <td>₹1000.00</td>
                                            <td><a className="primary-btn order-link" href="#">View Order</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div id="my-wishlist" className={activeTab === 'my-wishlist' ? '' : 'd-none'}>
                                <WishlistTable />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
