// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(() => {
        try {
            const userData = localStorage.getItem("user");
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            return null;
        }
    });
    // ✅ New: Refresh all states from localStorage
    const refresh = () => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        setToken(savedToken || null);

        try {
            setUser(savedUser ? JSON.parse(savedUser) : null);
        } catch (error) {
            console.error("Error parsing user data during refresh:", error);
            setUser(null);
        }

    };
  // ✅ Fetch cart and wishlist counts
    const fetchInitialCounts = async (userId) => {
        try {
            // Fetch Cart
            const cartRes = await axios.get(`http://localhost:8000/cart/${userId}`);
          
    updateCartCount(cartRes.data.items.length);
            // Fetch Wishlist
            const wishlistRes = await axios.get(`http://localhost:8000/wishlist/${userId}`);
            updateWishlistCount(wishlistRes.data?.wishlist?.productIds?.length || 0);
        } catch (error) {
            console.error("Error loading initial cart/wishlist counts:", error);
        }
    };
    useEffect(() => {
        if (user?._id) {
            fetchInitialCounts(user._id);
        }
    }, [user]);
    // ✅ Optional: Automatically refresh on mount
    useEffect(() => {
        refresh();
    }, []);
    // ✅ New states for cart and wishlist counts
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);

    const login = (newToken, userData) => {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setCartCount(0);         // Reset counts
        setWishlistCount(0);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    const setUserData = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    // ✅ Methods to update counts
    const updateCartCount = (count) => setCartCount(count);
    const updateWishlistCount = (count) => setWishlistCount(count);

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                isLoggedIn: !!token,
                setUserData,
                cartCount,
                wishlistCount,
                updateCartCount,
                updateWishlistCount
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
