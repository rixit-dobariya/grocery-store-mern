import { Link } from "react-router-dom";
import ProductList from "../../../components/user/ProductList";
import { useState } from "react";

const Home = () => {
  return (
    <div>
        <Carousel/>
        <ExclusiveOffers />
        <section className=" mt-5 container">
            <div className="d-flex justify-content-between featured-products">
                <h4>Trending products</h4>
                {/* <!-- <div className="d-flex gap-2">
                    <div className="active">All</div>
                    <div>Vegetables</div>
                    <div>Fruits</div>
                    <div>Coffee & teas</div>
                    <div>Namkeen</div>
                </div> --> */}
            </div>
            <ProductList />
            <div className="row my-5">
                <div className="col-md-6 col-6 ps-2 pe-2">
                    <div className="border position-relative banner">
                        <img src="img/banners/670ea91823ea4banner-1.png" alt="" className="img-fluid" />
                        <div className="banner-content">
                            <p className="label">Free delivery</p>
                            <h5 className="heading">Free shipping over ₹5000</h5>
                            <p className="content">Shop ₹5000 products and get free delivery anywhere</p>
                            <Link className="primary-btn order-link" to="/shop">Shop Now <i className='fas fa-arrow-right ms-2'></i></Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-6 pe-2 ps-2">
                    <div className="border position-relative banner">
                        <img src="img/banners/670ea92192b5bbanner-2.png" alt="" className="img-fluid" />
                        <div className="banner-content">
                            <p className="label">10% off</p>
                            <h5 className="heading">Organic Food</h5>
                            <p className="content">Save up to 10% off on your first order</p>
                            <Link className="primary-btn order-link" to="/shop">Shop Now <i className='fas fa-arrow-right ms-2'></i></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between featured-products">
                <h4>Featuerd products</h4>
                {/* <!-- <div className="d-flex gap-2">
                    <div className="active">All</div>
                    <div>Vegetables</div>
                    <div>Fruits</div>
                    <div>Coffee & teas</div>
                    <div>Namkeen</div>
                </div> --> */}
            </div>
            <ProductList />
        </section>
    </div>
  )
}

const Carousel = () => {
    const banners = [
        { id: 1, image: "banner.png" },
        { id: 2, image: "banner.png" },
        { id: 3, image: "banner.png" }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? banners.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === banners.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div id="carouselExampleIndicators" className="carousel slide">
            {/* Indicators */}
            <ol className="carousel-indicators">
                {banners.map((_, index) => (
                    <li
                        key={index}
                        className={index === activeIndex ? "active" : ""}
                        onClick={() => setActiveIndex(index)}
                    ></li>
                ))}
            </ol>

            {/* Slides */}
            <div className="carousel-inner">
                {banners.map((banner, index) => (
                    <div key={banner.id} className={`carousel-item ${index === activeIndex ? "active" : ""}`}>
                        <img className="d-block w-100" src={`/img/items/banners/${banner.image}`} alt={`Banner ${index + 1}`} />
                        {index === 0 && (
                            <div className="carousel-caption h-100 flex justify-content-center align-items-center d-md-block">
                                <div className="row align-items-center flex h-100">
                                    <div className="hero-content col-md-6 order-md-1 order-2 text-center text-md-start text-wrap justify-content-center text-black">
                                        <span>Welcome to</span>
                                        <h1 className="text-black" style={{color:"black"}}>PureBite</h1>
                                        <p>
                                            Discover a world of fresh, quality groceries delivered straight to your door. 
                                            From farm-fresh produce to pantry essentials, we bring convenience and freshness to your daily life.
                                        </p>
                                        <Link to="/shop" className="cta-button btn btn-primary text-center align-self-sm-center align-self-md-start">Explore</Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation Controls */}
            {banners.length >= 2 && (
                <>
                    <button className="carousel-control-prev" onClick={handlePrev}>
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button className="carousel-control-next" onClick={handleNext}>
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                </>
            )}
        </div>
    );
};

const ExclusiveOffers = () => {
    const offers = [
        { id: 1, discount: 20, minimumOrder: 500 },
        { id: 2, discount: 15, minimumOrder: 300 },
        { id: 3, discount: 25, minimumOrder: 700 },
    ];

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Exclusive Offers</h2>
            <div className="row">
                {offers.map((offer) => (
                    <div key={offer.id} className="col-md-6 mb-4">
                        <div className="card border-success shadow-sm">
                            <div className="card-body text-center">
                                <h5 className="card-title text-success">{offer.discount}% Discount</h5>
                                <p className="card-text">On orders above ₹{offer.minimumOrder}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

  
export default Home