import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ProductList from "../../components/user/ProductList";

export default function Shop() {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    ratings: "",
    priceRange: "",
    discount: ""
  });
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/products/");
        
        setAllProducts(data);
        setFilteredProducts(data); // default view
        console.log(data);
      } catch (error) {
        toast.error("Failed to load products");
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let result = [...allProducts];

    if (filters.ratings) {
      result = result.filter(p => p.rating >= parseInt(filters.ratings));
    }

    if (filters.priceRange) {
      result = result.filter(p => {
        const price = p.costPrice;
        switch (filters.priceRange) {
          case "lt50": return price < 50;
          case "51to100": return price >= 51 && price <= 100;
          case "101to200": return price >= 101 && price <= 200;
          case "201to500": return price >= 201 && price <= 500;
          case "gt500": return price > 500;
          default: return true;
        }
      });
    }

    if (filters.discount) {
      result = result.filter(p => {
        const discount = p.discount;
        switch (filters.discount) {
          case "lt5": return discount < 5;
          case "5to15": return discount >= 5 && discount <= 15;
          case "15to25": return discount >= 15 && discount <= 25;
          case "gt25": return discount > 25;
          default: return true;
        }
      });
    }

    setFilteredProducts(result);
  };

  return (
    <div className="container">
      {/* Top Navigation */}
      <div className="row align-items-center sitemap">
        <div className="col-6">
          <p className="mt-5">
            <Link to="/" className="text-decoration-none dim link">Home / </Link> Shop
          </p>
        </div>
        <div className="col-6 justify-content-end d-flex">
          <button className="primary-btn" onClick={() => setFilterVisible(!filterVisible)}>
            <i className="fa-solid fa-filter pe-2"></i>Filter
          </button>
        </div>
      </div>

      {/* Filters */}
      {filterVisible && (
        <form onSubmit={handleSubmit} method="post">
          <div className="border p-3 row" id="filter-section">
            {/* Ratings */}
            <div className="col-md-3 col-sm-4 col-6 mb-2">
              <h6 className="mb-2"><span>Customer Ratings</span></h6>
              {[4, 3, 2, 1].map((rating) => (
                <div className="text-nowrap" key={rating}>
                  <input
                    className="me-1"
                    type="radio"
                    name="ratings"
                    id={`${rating}star`}
                    value={rating}
                    checked={filters.ratings === String(rating)}
                    onChange={handleChange}
                  />
                  <label htmlFor={`${rating}star`}>{rating} <i className="fa fa-star"></i> and above</label>
                </div>
              ))}
            </div>

            {/* Price Range */}
            <div className="col-md-3 col-sm-4 col-6 mb-2">
              <h6 className="mb-2"><span>Price</span></h6>
              {["lt50", "51to100", "101to200", "201to500", "gt500"].map((price) => (
                <div className="text-nowrap" key={price}>
                  <input
                    className="me-1"
                    type="radio"
                    name="priceRange"
                    id={price}
                    value={price}
                    checked={filters.priceRange === price}
                    onChange={handleChange}
                  />
                  <label htmlFor={price}>
                    {{
                      lt50: "Less than Rs 50",
                      "51to100": "Rs 51 to 100",
                      "101to200": "Rs 101 to 200",
                      "201to500": "Rs 201 to 500",
                      gt500: "More than Rs 500"
                    }[price]}
                  </label>
                </div>
              ))}
            </div>

            {/* Discount */}
            <div className="col-md-3 col-sm-4 col-6 mb-2">
              <h6 className="mb-2"><span>Discount</span></h6>
              {["lt5", "5to15", "15to25", "gt25"].map((discount) => (
                <div className="text-nowrap" key={discount}>
                  <input
                    className="me-1"
                    type="radio"
                    name="discount"
                    id={discount}
                    value={discount}
                    checked={filters.discount === discount}
                    onChange={handleChange}
                  />
                  <label htmlFor={discount}>
                    {{
                      lt5: "Less than 5%",
                      "5to15": "5% to 15%",
                      "15to25": "15% to 25%",
                      gt25: "More than 25%"
                    }[discount]}
                  </label>
                </div>
              ))}
            </div>

            <div className="col-md-3 d-flex align-items-end justify-content-end">
              <input type="submit" value="Apply" className="primary-btn js-filter-btn" />
            </div>
          </div>
        </form>
      )}

      {/* Product Listing */}
      <ProductList products={filteredProducts} />
    </div>
  );
}
