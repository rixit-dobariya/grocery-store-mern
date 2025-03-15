import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'

const Footer =(props)=> {

    return (
    <div className="footer container mt-5 d-flex flex-column border-top">
        <div className="row d-flex justify-content-around align-items-center gap-5 my-4" bis_skin_checked="1">
            <div className="col-6 col-md-2 d-flex justify-content-center align-items-center" bis_skin_checked="1">
                <div className="logo">
                <Link to="/" className="nav-link p-0 text-body-secondary fw-bolder fs-1 text">
                    PUREBITE
                </Link>
                <p className="text-nowrap">Taste the Goodness</p> 
                </div>
            </div>

            <div className="col-6 col-md-2 d-flex flex-column justify-content-center align-items-center" bis_skin_checked="1">
            <h5>Quick Links</h5>
            <ul className="nav flex-column">
                <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-body-secondary">Home</Link></li>
                <li className="nav-item mb-2"><Link to="/shop" className="nav-link p-0 text-body-secondary">Shop</Link></li>
                <li className="nav-item mb-2"><Link to="/contact" className="nav-link p-0 text-body-secondary">Contact</Link></li>
                <li className="nav-item mb-2"><Link to="/order-history" className="nav-link p-0 text-body-secondary">Your Orders</Link></li>
                <li className="nav-item mb-2"><Link to="/cart" className="nav-link p-0 text-body-secondary">Cart</Link></li>
            </ul>
            </div>

            <div className="col-md-5 offset-md-1 mb-3 d-flex flex-column justify-content-center align-items-center" bis_skin_checked="1">
            <form>
                <h5>Subscribe to our newsletter</h5>
                <p>Monthly digest of what's new and exciting from us.</p>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2" bis_skin_checked="1">
                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                <a className="btns" type="button">Subscribe</a>
                </div>
            </form>
            </div>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-center border-top" bis_skin_checked="1">
            <p className="my-4">© 2025 Company, Inc. All rights reserved.</p>
            {/* <ul className="list-unstyled d-flex my-4">
                <li className="ms-4"><a className="link-body-emphasis" href="#"><i className="fa-brands fa-x-twitter font-black"></i></a></li>
                <li className="ms-4"><a className="link-body-emphasis" href="#"><i className="fa fa-instagram font-black"></i></a></li>
                <li className="ms-4"><a className="link-body-emphasis" href="#"><i className="fa fa-facebook font-black"></i></a></li>
            </ul> */}
        </div>
        <ToastContainer />
    </div>
    )
}
export default Footer
