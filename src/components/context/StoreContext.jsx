import {
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const url = "https://npg-store.vercel.app";

  // ==========================================
  // STATES
  // ==========================================

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);

  // ==========================================
  // GET AUTH TOKEN
  // ==========================================

  const getStoredToken = () => {
    return (
      localStorage.getItem("npg-token") ||
      sessionStorage.getItem("npg-token") ||
      ""
    );
  };

  // ==========================================
  // FETCH PRODUCTS
  // ==========================================

  const fetchProducts = useCallback(async () => {
    try {
      setProductsLoading(true);

      const res = await axios.get(
        `${url}/api/product/getall`
      );

      if (res.data?.success) {
        setProducts(res.data.products || []);
      } else {
        setProducts([]);

        toast.error(
          res.data?.error || "No products found"
        );
      }
    } catch (error) {
      console.error(
        "❌ Product fetch error:",
        error
      );

      setProducts([]);

      toast.error("Failed to load products");
    } finally {
      setProductsLoading(false);
    }
  }, [url]);

  // ==========================================
  // GET PRODUCT PRICE
  // ==========================================

  const getProductPrice = useCallback(
    (productId) => {
      const product = products.find(
        (item) =>
          String(item._id) === String(productId)
      );

      if (!product) return 0;

      return Number(
        product.offerPrice ??
          product.price ??
          0
      );
    },
    [products]
  );

  // ==========================================
  // CONVERT BACKEND CART TO OBJECT
  //
  // Backend:
  // cartItems: [
  //   {
  //     product: {...},
  //     quantity: 2
  //   }
  // ]
  //
  // Frontend:
  // {
  //   "productId": 2
  // }
  // ==========================================

  const convertBackendCart = useCallback(
    (items = []) => {
      const formattedCart = {};

      items.forEach((item) => {
        const productId =
          item.product?._id ||
          item.product;

        if (productId) {
          formattedCart[String(productId)] =
            Number(item.quantity || 1);
        }
      });

      return formattedCart;
    },
    []
  );

  // ==========================================
  // GET CART FROM BACKEND
  // /api/cart/getall
  // ==========================================

  const fetchCart = useCallback(
    async (authToken = null) => {
      const activeToken =
        authToken || getStoredToken();

      if (!activeToken) {
        return;
      }

      try {
        setCartLoading(true);

        const res = await axios.get(
          `${url}/api/cart/getall`,
          {
            headers: {
              Authorization: `Bearer ${activeToken}`,
            },
          }
        );

        if (res.data?.success) {
          const backendCart =
            res.data.cart?.cartItems ||
            res.data.cartItems ||
            [];

          const formattedCart =
            convertBackendCart(backendCart);

          setCartItems(formattedCart);

          localStorage.setItem(
            "cartItems",
            JSON.stringify(formattedCart)
          );
        }
      } catch (error) {
        // A new user may not have a cart yet.
        if (
          error.response?.status !== 404
        ) {
          console.error(
            "❌ Fetch cart error:",
            error
          );
        }

        setCartItems({});
      } finally {
        setCartLoading(false);
      }
    },
    [url, convertBackendCart]
  );

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    const initialize = async () => {
      try {
        // Load guest/local cart first
        const storedCart =
          localStorage.getItem("cartItems");

        if (storedCart) {
          try {
            setCartItems(
              JSON.parse(storedCart)
            );
          } catch {
            setCartItems({});
          }
        }

        // Load authentication
        const storedToken =
          getStoredToken();

        const storedUser =
          localStorage.getItem("npg-user") ||
          sessionStorage.getItem("npg-user");

        if (storedToken) {
          setToken(storedToken);

          if (storedUser) {
            try {
              setUser(
                JSON.parse(storedUser)
              );
            } catch (error) {
              console.error(
                "Failed to parse user:",
                error
              );
            }
          }

          // Load backend cart
          await fetchCart(storedToken);
        }
      } catch (error) {
        console.error(
          "❌ Store initialization error:",
          error
        );
      } finally {
        setLoading(false);
      }

      fetchProducts();
    };

    initialize();
  }, [fetchCart, fetchProducts]);

  // ==========================================
  // SAVE CART LOCALLY
  // ==========================================

  useEffect(() => {
    try {
      localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error(
        "Failed to save cart:",
        error
      );
    }
  }, [cartItems]);

  // ==========================================
  // FETCH USER
  // ==========================================

  const fetchUserData = async (
    authToken
  ) => {
    try {
      const activeToken =
        authToken || getStoredToken();

      if (!activeToken) return;

      const res = await axios.get(
        `${url}/api/user/me`,
        {
          headers: {
            Authorization: `Bearer ${activeToken}`,
          },
        }
      );

      if (res.data?.success === false) {
        throw new Error(
          res.data?.message ||
            "Failed to fetch user"
        );
      }

      const userData =
        res.data.user;

      setUser(userData);

      localStorage.setItem(
        "npg-user",
        JSON.stringify(userData)
      );
    } catch (error) {
      console.error(
        "❌ Failed to fetch user:",
        error
      );

      logout();
    }
  };

  // ==========================================
  // LOGIN
  // ==========================================

  const login = async (
    authToken,
    userData,
    rememberMe = true
  ) => {
    const storage = rememberMe
      ? localStorage
      : sessionStorage;

    storage.setItem(
      "npg-token",
      authToken
    );

    storage.setItem(
      "npg-user",
      JSON.stringify(userData)
    );

    setToken(authToken);
    setUser(userData);
    setAdmin(null);

    // Load user's backend cart
    await fetchCart(authToken);
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {
    localStorage.removeItem(
      "npg-token"
    );

    localStorage.removeItem(
      "npg-user"
    );

    sessionStorage.removeItem(
      "npg-token"
    );

    sessionStorage.removeItem(
      "npg-user"
    );

    localStorage.removeItem(
      "cartItems"
    );

    setToken("");
    setUser(null);
    setAdmin(null);
    setCartItems({});

    window.dispatchEvent(
      new Event("npg-auth-change")
    );

    navigate("/login");
  };

  // ==========================================
  // UPDATE USER
  // ==========================================

  const updateUser = (updatedUser) => {
    setUser(updatedUser);

    const activeToken =
      getStoredToken();

    if (
      localStorage.getItem("npg-token")
    ) {
      localStorage.setItem(
        "npg-user",
        JSON.stringify(updatedUser)
      );
    } else if (
      sessionStorage.getItem("npg-token")
    ) {
      sessionStorage.setItem(
        "npg-user",
        JSON.stringify(updatedUser)
      );
    }
  };

  // ==========================================
  // ADD TO CART
  // POST /api/cart/add
  // ==========================================

  const addToCart = async (productId) => {
    if (!productId) return;

    const productKey =
      String(productId);

    // Optimistic frontend update
    setCartItems((current) => ({
      ...current,
      [productKey]:
        Number(current[productKey] || 0) +
        1,
    }));

    const activeToken =
      token || getStoredToken();

    // Guest cart
    if (!activeToken) {
      return;
    }

    try {
      const res = await axios.post(
        `${url}/api/cart/add`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${activeToken}`,
          },
        }
      );

      if (res.data?.success) {
        const backendItems =
          res.data.cartItems || [];

        const formattedCart =
          convertBackendCart(
            backendItems
          );

        setCartItems(formattedCart);
      }
    } catch (error) {
      console.error(
        "❌ Add to cart error:",
        error
      );

      // Reload backend cart if request failed
      await fetchCart(activeToken);

      toast.error(
        error.response?.data?.message ||
          "Failed to add item to cart"
      );
    }
  };

  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const increaseQuantity = async (
    productId
  ) => {
    await addToCart(productId);
  };

  // ==========================================
  // DECREASE QUANTITY
  // POST /api/cart/remove
  // ==========================================

  const decreaseQuantity = async (
    productId
  ) => {
    if (!productId) return;

    const productKey =
      String(productId);

    const currentQuantity =
      Number(
        cartItems[productKey] || 0
      );

    if (currentQuantity <= 0) {
      return;
    }

    // Optimistic frontend update
    setCartItems((current) => {
      const updated = {
        ...current,
      };

      if (
        Number(updated[productKey]) <= 1
      ) {
        delete updated[productKey];
      } else {
        updated[productKey] =
          Number(updated[productKey]) -
          1;
      }

      return updated;
    });

    const activeToken =
      token || getStoredToken();

    // Guest cart
    if (!activeToken) {
      return;
    }

    try {
      const res = await axios.post(
        `${url}/api/cart/remove`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${activeToken}`,
          },
        }
      );

      if (res.data?.success) {
        const backendItems =
          res.data.cartItems || [];

        const formattedCart =
          convertBackendCart(
            backendItems
          );

        setCartItems(formattedCart);
      }
    } catch (error) {
      console.error(
        "❌ Remove from cart error:",
        error
      );

      await fetchCart(activeToken);

      toast.error(
        error.response?.data?.message ||
          "Failed to update cart"
      );
    }
  };

  // ==========================================
  // REMOVE ENTIRE ITEM
  // ==========================================

  const removeFromCart = async (
    productId
  ) => {
    if (!productId) return;

    const productKey =
      String(productId);

    const quantity =
      Number(
        cartItems[productKey] || 0
      );

    if (quantity <= 0) return;

    const activeToken =
      token || getStoredToken();

    // Guest cart
    if (!activeToken) {
      setCartItems((current) => {
        const updated = {
          ...current,
        };

        delete updated[productKey];

        return updated;
      });

      return;
    }

    try {
      // Backend remove endpoint removes ONE
      // quantity at a time.
      for (
        let i = 0;
        i < quantity;
        i++
      ) {
        await axios.post(
          `${url}/api/cart/remove`,
          {
            productId,
          },
          {
            headers: {
              Authorization: `Bearer ${activeToken}`,
            },
          }
        );
      }

      await fetchCart(activeToken);
    } catch (error) {
      console.error(
        "❌ Remove item error:",
        error
      );

      await fetchCart(activeToken);

      toast.error(
        error.response?.data?.message ||
          "Failed to remove item"
      );
    }
  };

  // ==========================================
  // CLEAR CART
  // ==========================================

  const clearCart = () => {
    setCartItems({});

    localStorage.removeItem(
      "cartItems"
    );
  };

  // ==========================================
  // CART COUNT
  // ==========================================

  const getCartCount = () => {
    return Object.values(
      cartItems
    ).reduce(
      (total, quantity) =>
        total +
        Number(quantity || 0),
      0
    );
  };

  // ==========================================
  // CART AMOUNT
  // ==========================================

  const getCartAmount = () => {
    return Object.entries(
      cartItems
    ).reduce(
      (total, [productId, quantity]) => {
        const price =
          getProductPrice(productId);

        return (
          total +
          price *
            Number(quantity || 0)
        );
      },
      0
    );
  };

  // ==========================================
  // CONTEXT VALUE
  // ==========================================

  const contextValue = {
    url,

    products,
    productsLoading,

    cartItems,
    cartLoading,

    token,
    user,
    admin,

    loading,

    navigate,

    login,
    logout,
    updateUser,
    fetchUserData,

    fetchProducts,

    fetchCart,

    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,

    clearCart,

    getCartCount,
    getCartAmount,

    getProductPrice,

    setToken,
    setUser,
    setAdmin,
  };

  return (
    <StoreContext.Provider
      value={contextValue}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;