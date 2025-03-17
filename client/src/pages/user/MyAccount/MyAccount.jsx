import React, { useState,useEffect } from 'react';
import UpdatePasswordForm from './UpdatePasswordForm';
import UpdateProfileForm from './UpdateProfileForm';
import WishlistTable from '../../../components/user/WishlistTable';
import OrdersTable from '../../../components/user/OrdersTable';
import UpdateEmailForm from './UpdateEmailForm';
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';


const MyAccount = () => {
    const [activeTab, setActiveTab] = useState('my-profile');
    const location = useLocation();
    const message = location.state?.message;
    useEffect(() => {
        if (message) {
            toast.success(message);
        }
    }, []);
    
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
                        <div className="shadow-sm p-4 d-flex heading text-nowrap flex-md-grow-0 flex-grow-1 justify-content-md-start justify-content-center">
                            <ul className="d-flex flex-row flex-md-column gap-3 heading align-items-start p-0">
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
                                <p className="highlight title">Change Email</p>
                                <UpdateEmailForm />
                                <p className="highlight title">Change Password</p>
                                <UpdatePasswordForm />
                            </div>
                            <div id="all-orders" className={activeTab === 'all-orders' ? '' : 'd-none'}>
                                <div className="table-responsive">
                                    <OrdersTable />
                                </div>
                            </div>
                            <div id="my-wishlist" className={activeTab === 'my-wishlist' ? '' : 'd-none'}>
                                <div className="table-responsive">
                                    <WishlistTable />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
