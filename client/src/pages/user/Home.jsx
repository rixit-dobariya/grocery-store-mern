import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../../components/user/ProductList";
const Home = () => {
  const [banners, setBanners] = useState([]);
  const [offers, setOffers] = useState([]);
  const [tredingProducts, setTrendingProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchBanners();
    fetchOffers();
    fetchTrendingProducts();
    fetchLatestProducts();
    fetchCategories();
  }, []);

  const fetchBanners = async () => {
    const res = await axios.get("http://localhost:8000/banners");
    setBanners(res.data);
  };

  const fetchOffers = async () => {
    const res = await axios.get("http://localhost:8000/offers");
    setOffers(res.data.filter((offer) => offer.activeStatus));
  };

  const fetchTrendingProducts = async () => {
    const res = await axios.get("http://localhost:8000/products/trending");
    setTrendingProducts(res.data);
  };
  const fetchLatestProducts = async () => {
    const res = await axios.get("http://localhost:8000/products/latest");
    setLatestProducts(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:8000/categories");
    setCategories(res.data);
  };

  const sliderBanners = banners.filter((b) => b.type === "slider");
  const promoBanners = banners.filter((b) => b.type !== "slider");


  return (
    <div>
      <Carousel banners={sliderBanners} />
      {/* <Categories categories={categories} /> */}
      <ExclusiveOffers offers={offers} />

      <section className="mt-5 container">
        <div className="d-flex justify-content-between featured-products">
          <h4>Trending products</h4>
        </div>
        <ProductList products={tredingProducts} />

        <div className="row my-5 gap-md-0 gap-3">
            {promoBanners[0] && (
                <div className="col-md-6 col-12">
                <div className="border position-relative banner">
                    <img src={promoBanners[0].bannerImage} alt="" className="img-fluid" />
                    <div className="banner-content">
                    <p className="label">Free Shipping</p>
                    <h5 className="heading my-2">Special Deal</h5>
                    <p className="content p-0 align-self-start">
                        Shipping is free on your first order
                    </p>
                    <Link className="primary-btn order-link" to="/shop">
                        Shop Now <i className="fas fa-arrow-right ms-2"></i>
                    </Link>
                    </div>
                </div>
                </div>
            )}

            {promoBanners[1] && (
                <div className="col-md-6 col-12">
                <div className="border position-relative banner">
                    <img src={promoBanners[1].bannerImage} alt="" className="img-fluid" />
                    <div className="banner-content">
                    <p className="label">Exclusive Offer</p>
                    <h5 className="heading my-2">Buy One Get One</h5>
                    <p className="content p-0 align-self-start">
                        Get an extra item absolutely free on selected products
                    </p>
                    <Link className="primary-btn order-link" to="/shop">
                        Grab Offer <i className="fas fa-arrow-right ms-2"></i>
                    </Link>
                    </div>
                </div>
                </div>
            )}
        </div>


        <div className="d-flex justify-content-between featured-products">
          <h4>Latest products</h4>
        </div>
        <ProductList products={latestProducts} />
      </section>
    </div>
  );
};

const Carousel = ({ banners }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  return (
    <div id="carouselExampleIndicators" className="carousel slide">
      <ol className="carousel-indicators">
        {banners.map((_, index) => (
          <li
            key={index}
            className={index === activeIndex ? "active" : ""}
            onClick={() => setActiveIndex(index)}
          ></li>
        ))}
      </ol>

      <div className="carousel-inner">
        {banners.map((banner, index) => (
          <div
            key={banner._id}
            className={`carousel-item ${index === activeIndex ? "active" : ""}`}
          >
            <img
              className="d-block w-100"
              src={banner.bannerImage}
              alt={`Banner ${index + 1}`}
            />
            {index === 0 && (
              <div className="carousel-caption h-100 d-md-block">
                <div className="row align-items-center h-100">
                  <div className="hero-content col-md-6 text-black text-center text-md-start">
                    <span>Welcome to</span>
                    <h1 className="text-black">PureBite</h1>
                    <p>
                      Discover a world of fresh, quality groceries delivered
                      straight to your door.
                    </p>
                    <Link to="/shop" className="btn btn-primary">
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {banners.length >= 2 && (
        <>
          <button className="carousel-control-prev" onClick={handlePrev}>
            <span className="carousel-control-prev-icon" />
          </button>
          <button className="carousel-control-next" onClick={handleNext}>
            <span className="carousel-control-next-icon" />
          </button>
        </>
      )}
    </div>
  );
};

const ExclusiveOffers = ({ offers }) => (
  <div className="container mt-5">
    <h2 className="text-center mb-4">Exclusive Offers</h2>
    <div className="row">
      {offers.map((offer) => (
        <div key={offer._id} className="col-md-6 mb-4">
          <div className="card border-success shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-success">{offer.discount}% Discount</h5>
              <p className="card-text">On orders above ₹{offer.minimumOrder}</p>
              <p className="card-text">
                <strong>Use Code:</strong>{" "}
                <span className="badge bg-success">{offer.offerCode}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Categories = ({ categories }) => (
  <div className="container mt-4">
    <div className="row justify-content-center">
      {categories.map((category) => (
        <div key={category._id} className="col-md-2 col-4 text-center mb-3">
          <img
            src={category.image}
            alt={category.name}
            className="img-fluid rounded-circle mb-2"
            style={{ height: "80px", width: "80px", objectFit: "cover" }}
          />
          <p className="mb-0">{category.name}</p>
        </div>
      ))}
    </div>
  </div>
);


export default Home;
