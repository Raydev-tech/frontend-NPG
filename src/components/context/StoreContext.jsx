import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${url}/api/product/getall`);
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("❌ Product fetch error:", err);
      toast.error("Failed to load products");
    }
  };

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  // Save cart to localStorage on update
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Initialize auth
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      const storedAdmin = localStorage.getItem("admin");


      if (storedToken) {
        setToken(storedToken);
        try {
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
          } else {
            await fetchUserData(storedToken);
          }
        } catch (e) {
          console.error("❌ Error parsing stored auth", e);
        }
      }

      setLoading(false);
    };

    initializeAuth();
    fetchProducts();
  }, []);

  // Fetch user data
  const fetchUserData = async (token) => {
    try {
      const res = await axios.get(`${url}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      console.error("❌ Failed to fetch user profile", err);
      logout();
    }
  };

  // Auth functions
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    localStorage.removeItem("cartItems");
    setToken("");
    setUser(null);
    setAdmin(null);
    setCartItems({});
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Cart Management
  const addToCart = async (itemId) => {
    const updatedCart = { ...cartItems, [itemId]: (cartItems[itemId] || 0) + 1 };
    setCartItems(updatedCart);

    try {
      await axios.post(`${url}/api/cart/add`, { productId: itemId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("❌ Sync error:", err.message);
    }
  };

  const updateCartQuantity = async (itemId, quantity) => {
    const updatedCart = { ...cartItems };
    if (quantity === 0) {
      delete updatedCart[itemId];
    } else {
      updatedCart[itemId] = quantity;
    }
    setCartItems(updatedCart);

    try {
      await axios.post(`${url}/api/cart/remove`, { productId: itemId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("❌ Failed to sync cart quantity:", err.message);
    }
  };

  // ✅ Clear cart after order placement
  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("cartItems");
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = products.find((p) => p._id === id);
      return item ? total + item.offerPrice * qty : total;
    }, 0);
  };

  const contextValue = {
    products,
    cartItems,
    token,
    user,
    admin,
    loading,
    navigate,
    login,
    logout,
    updateUser,
    fetchUserData,
    addToCart,
    updateCartQuantity,
    clearCart, // ✅ include in context
    getCartCount,
    getCartAmount,
    setToken,
    setUser,
    setAdmin,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
