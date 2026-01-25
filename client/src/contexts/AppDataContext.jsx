import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
    const { user } = useAuth();

    // --- Product & Filter State ---
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        ratings: "",
        priceRange: "",
        discount: "",
    });
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isProductsLoaded, setIsProductsLoaded] = useState(false); // Track if loaded

    // --- Cart & Wishlist State ---
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);

    // --- Actions ---

    // 1. Fetch Products (Lazy Load)
    const fetchProducts = async () => {
        if (isProductsLoaded && allProducts.length > 0) return; // Already loaded

        try {
            const { data } = await axios.get("http://localhost:8000/products/");
            setAllProducts(data);
            setFilteredProducts(data);
            setIsProductsLoaded(true);
        } catch (error) {
            console.error("Failed to load products:", error);
        }
    };

    // 2. Filter Logic
    const filterProducts = () => {
        let result = [...allProducts];

        // Search by name
        if (searchQuery) {
            result = result.filter((product) =>
                product.productName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Ratings
        if (filters.ratings) {
            result = result.filter((p) => p.averageRating >= parseInt(filters.ratings));
        }

        // Price range
        if (filters.priceRange) {
            result = result.filter((p) => {
                const price = p.salePrice - (p.salePrice * p.discount) / 100;
                switch (filters.priceRange) {
                    case "lt50":
                        return price < 50;
                    case "51to100":
                        return price >= 51 && price <= 100;
                    case "101to200":
                        return price >= 101 && price <= 200;
                    case "201to500":
                        return price >= 201 && price <= 500;
                    case "gt500":
                        return price > 500;
                    default:
                        return true;
                }
            });
        }

        // Discount
        if (filters.discount) {
            result = result.filter((p) => {
                const discount = p.discount;
                switch (filters.discount) {
                    case "lt5":
                        return discount < 5;
                    case "5to15":
                        return discount >= 5 && discount <= 15;
                    case "15to25":
                        return discount >= 15 && discount <= 25;
                    case "gt25":
                        return discount > 25;
                    default:
                        return true;
                }
            });
        }

        setFilteredProducts(result);
    };

    // Auto-filter when dependencies change
    useEffect(() => {
        if (allProducts.length > 0) {
            filterProducts();
        }
    }, [searchQuery, filters, allProducts]);


    // 3. Cart & Wishlist Logic
    const updateCartCount = (count) => setCartCount(count);
    const updateWishlistCount = (count) => setWishlistCount(count);

    const fetchInitialCounts = async (userId) => {
        try {
            // Fetch Cart
            const cartRes = await axios.get(`http://localhost:8000/cart/${userId}`);
            if (cartRes?.data?.items?.length)
                updateCartCount(cartRes.data.items.length);

            // Fetch Wishlist
            const wishlistRes = await axios.get(`http://localhost:8000/wishlist/${userId}`);
            if (wishlistRes?.data?.wishlist?.productIds?.length)
                updateWishlistCount(
                    wishlistRes.data?.wishlist?.productIds?.length || 0
                );

        } catch (error) {
            updateCartCount(0);
            updateWishlistCount(0);
        }
    };

    // Fetch counts when user changes (and is logged in)
    useEffect(() => {
        console.log(user);
        if (user?._id && user.role === "User") {
            fetchInitialCounts(user._id);
        } else {
            // Reset if no user
            setCartCount(0);
            setWishlistCount(0);
        }
    }, [user]);

    return (
        <AppDataContext.Provider
            value={{
                // Products
                allProducts,
                filteredProducts,
                fetchProducts,
                isProductsLoaded,

                // Filters
                searchQuery,
                setSearchQuery,
                filters,
                setFilters,

                // Counts
                cartCount,
                wishlistCount,
                updateCartCount,
                updateWishlistCount
            }}
        >
            {children}
        </AppDataContext.Provider>
    );
};

export const useAppData = () => useContext(AppDataContext);
