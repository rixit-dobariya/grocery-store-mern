import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = ({}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [query, setQuery] = useState("");
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize Bootstrap's collapse functionality
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarToggler && navbarCollapse) {
            navbarToggler.addEventListener('click', () => {
                setIsNavCollapsed(!isNavCollapsed);
            });

            // Close navbar when clicking outside
            document.addEventListener('click', (event) => {
                const isClickInside = navbarToggler.contains(event.target) || navbarCollapse.contains(event.target);
                if (!isClickInside && !isNavCollapsed) {
                    setIsNavCollapsed(true);
                    navbarCollapse.classList.remove('show');
                }
            });
        }
    }, []);

	const validateSearch = (event) => {
		event.preventDefault();
		navigate("/shop");
	};
	const handleDoubleClick = () => {
		setIsLoggedIn((prev) => !prev);
	};
    const handleLogout = ()=>{
        toast.success("You have been logged out successfully!");
        navigate("/");
    }
    
	return (
		<>
			{isLoggedIn ? (
				<nav
					id="navibar"
					className="navbar navbar-expand-lg navbar-light sticky-top container-fluid"
                    onDoubleClick={handleDoubleClick}
				>
					<div className="container-fluid">
						<Link className="logo navbar-brand fs-1 fw-bold" to="/">
							PureBite
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarContent"
							aria-controls="navbarContent"
							aria-expanded={!isNavCollapsed}
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div
							className={`collapse navbar-collapse text-center ${!isNavCollapsed ? 'show' : ''}`}
							id="navbarContent"
						>
							<ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-center">
								<li className="nav-item">
									<NavLink className="nav-link" to="/">
										Home
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/shop">
										Shop
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/contact">
										Contact
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/about">
										About
									</NavLink>
								</li>
							</ul>

							<div className="d-flex flex-lg-row flex-column align-items-center w-100 mt-3 mt-lg-0">
								<form
									className="d-flex mb-3 mb-lg-0 me-lg-3 w-100 justify-content-center"
									onSubmit={validateSearch}
								>
									<input
										className="search-input flex-sm-grow-0 flex-grow-1"
										type="search"
										placeholder="Search for items..."
										value={query}
										onChange={(e) => setQuery(e.target.value)}
									/>
									<button className="primary-btn search-button">
										<i className="fa fa-search" aria-hidden="true"></i>
									</button>
								</form>

								<div className="d-flex align-items-center justify-content-center mt-3 mt-lg-0">
									<div className="dropdown profile-menu me-3">
										<a
											className="nav-link dropdown-toggle d-flex align-items-center justify-content-center"
											href="#"
											role="button"
											data-bs-toggle="dropdown"
											aria-expanded="false"
										>
											<img
												src="img/users/default-img.png"
												alt="User"
												style={{
													width: "35px",
													height: "35px",
													borderRadius: "50%",
													marginRight: "8px",
												}}
											/>
											Rixit
										</a>
										<ul className="dropdown-menu dropdown-menu-end">
											<li>
												<NavLink className="dropdown-item" to="/account">
													My Profile
												</NavLink>
											</li>
											<li>
												<NavLink className="dropdown-item" to="/order-history">
													Your Orders
												</NavLink>
											</li>
											<li>
												<button className="dropdown-item" onClick={handleLogout}>
													Log out
												</button>
											</li>
										</ul>
									</div>

									<div className="d-flex">
										<Link to="/wishlist" className="icon-link me-2">
											<div className="icon position-relative">
												<i className="fa-regular fa-heart"></i>
												<span className="badge-class">2</span>
											</div>
										</Link>
										<Link to="/cart" className="icon-link">
											<div className="icon position-relative">
												<i className="fa-solid fa-cart-shopping"></i>
												<span className="badge-class">3</span>
											</div>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>
			) : (
				<nav
					id="navibar"
					className="navbar navbar-expand-lg navbar-light sticky-top"
                    onDoubleClick={handleDoubleClick}
				>
					<div className="container">
						<Link className="logo navbar-brand fs-1 fw-bold" to="/">
							PureBite
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarContent"
							aria-controls="navbarContent"
							aria-expanded={!isNavCollapsed}
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div
							className={`collapse navbar-collapse text-center ${!isNavCollapsed ? 'show' : ''}`}
							id="navbarContent"
						>
							<ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-center">
								<li className="nav-item">
									<NavLink className="nav-link" to="/">
										Home
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/shop">
										Shop
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/contact">
										Contact
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/about">
										About
									</NavLink>
								</li>
							</ul>

							<div className="d-flex flex-lg-row flex-column align-items-center  w-100 mt-3 mt-lg-0">
								<form className="d-flex mb-3 mb-lg-0 me-lg-3 justify-content-center">
									<input
										className="search-input flex-sm-grow-0 flex-grow-1"
										type="search"
										placeholder="Search for items..."
									/>
									<button className="primary-btn search-button">
										<i className="fa fa-search" aria-hidden="true"></i>
									</button>
								</form>
								<div className="d-flex">
									<Link className="header-btn me-2" to="/register">
										Register
									</Link>
									<Link className="header-btn" to="/login">
										Login
									</Link>
								</div>
							</div>
						</div>
					</div>
				</nav>
			)}
		</>
	);
};

export default Header;
