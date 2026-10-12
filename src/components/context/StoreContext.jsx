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

  // ==========================================
  // BACKEND URL
  // ==========================================

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
  const [productsLoading, setProductsLoading] =
    useState(true);
  const [cartLoading, setCartLoading] =
    useState(false);

  // ==========================================
  // GET STORED TOKEN
  // ==========================================

  const getStoredToken = () => {
    return (
      localStorage.getItem("npg-token") ||
      sessionStorage.getItem("npg-token") ||
      ""
    );
  };

  // ==========================================
  // CONVERT BACKEND CART
  // ==========================================

  /*
    Backend:

    [
      {
        product: {
          _id: "123"
        },
        quantity: 2
      }
    ]

    Frontend:

    {
      "123": 2
    }
  */

  const convertBackendCart = useCallback(
    (items = []) => {
      const formattedCart = {};

      if (!Array.isArray(items)) {
        return formattedCart;
      }

      items.forEach((item) => {
        const productId =
          item?.product?._id ||
          item?.product?.id ||
          item?.product;

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
  // FETCH PRODUCTS
  // ==========================================

  const fetchProducts = useCallback(async () => {
    try {
      setProductsLoading(true);

      const response = await axios.get(
        `${url}/api/product/getall`
      );

      console.log(
        "PRODUCT RESPONSE:",
        response.data
      );

      if (response.data?.success) {
        setProducts(
          response.data.products || []
        );
      } else {
        setProducts([]);

        toast.error(
          response.data?.message ||
            "No products found"
        );
      }
    } catch (error) {
      console.error(
        "❌ FETCH PRODUCTS ERROR:",
        error.response?.data ||
          error.message
      );

      setProducts([]);

      toast.error(
        "Failed to load products"
      );
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
          String(item._id) ===
          String(productId)
      );

      if (!product) {
        return 0;
      }

      return Number(
        product.offerPrice ??
          product.price ??
          0
      );
    },
    [products]
  );

  // ==========================================
  // GET CART
  // ==========================================

  const fetchCart = useCallback(
    async (authToken = null) => {
      const activeToken =
        authToken || getStoredToken();

      if (!activeToken) {
        setCartItems({});
        return;
      }

      try {
        setCartLoading(true);

        console.log("🛒 FETCHING CART...");

        const response = await axios.get(
          `${url}/api/cart/getall`,
          {
            headers: {
              Authorization:
                `Bearer ${activeToken}`,
            },
          }
        );

        console.log(
          "🛒 CART RESPONSE:",
          response.data
        );

        if (response.data?.success) {
          const backendItems =
            response.data?.cart?.cartItems ||
            response.data?.cartItems ||
            [];

          const formattedCart =
            convertBackendCart(
              backendItems
            );

          console.log(
            "🛒 FORMATTED CART:",
            formattedCart
          );

          setCartItems(formattedCart);

          localStorage.setItem(
            "cartItems",
            JSON.stringify(formattedCart)
          );
        } else {
          setCartItems({});
        }
      } catch (error) {
        console.error(
          "❌ FETCH CART ERROR:",
          error.response?.data ||
            error.message
        );

        if (
          error.response?.status === 401
        ) {
          setCartItems({});
        }
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
        setLoading(true);

        // ------------------------------
        // LOCAL CART
        // ------------------------------

        const storedCart =
          localStorage.getItem(
            "cartItems"
          );

        if (storedCart) {
          try {
            const parsedCart =
              JSON.parse(storedCart);

            if (
              parsedCart &&
              typeof parsedCart ===
                "object"
            ) {
              setCartItems(parsedCart);
            }
          } catch (error) {
            console.error(
              "LOCAL CART ERROR:",
              error
            );

            setCartItems({});
          }
        }

        // ------------------------------
        // TOKEN
        // ------------------------------

        const storedToken =
          getStoredToken();

        // ------------------------------
        // USER
        // ------------------------------

        const storedUser =
          localStorage.getItem(
            "npg-user"
          ) ||
          sessionStorage.getItem(
            "npg-user"
          );

        if (storedToken) {
          setToken(storedToken);

          if (storedUser) {
            try {
              setUser(
                JSON.parse(storedUser)
              );
            } catch (error) {
              console.error(
                "USER PARSE ERROR:",
                error
              );
            }
          }

          // ----------------------------
          // MONGODB CART
          // ----------------------------

          await fetchCart(
            storedToken
          );
        }

        // ------------------------------
        // PRODUCTS
        // ------------------------------

        await fetchProducts();
      } catch (error) {
        console.error(
          "❌ STORE INITIALIZATION ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
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
        "SAVE CART ERROR:",
        error
      );
    }
  }, [cartItems]);

  // ==========================================
  // FETCH USER
  // ==========================================

  const fetchUserData = async (
    authToken = null
  ) => {
    try {
      const activeToken =
        authToken || getStoredToken();

      if (!activeToken) {
        return;
      }

      const response = await axios.get(
        `${url}/api/user/me`,
        {
          headers: {
            Authorization:
              `Bearer ${activeToken}`,
          },
        }
      );

      console.log(
        "USER RESPONSE:",
        response.data
      );

      if (
        response.data?.success ===
        false
      ) {
        throw new Error(
          response.data?.message ||
            "Failed to fetch user"
        );
      }

      const userData =
        response.data?.user;

      if (userData) {
        setUser(userData);

        if (
          localStorage.getItem(
            "npg-token"
          )
        ) {
          localStorage.setItem(
            "npg-user",
            JSON.stringify(userData)
          );
        } else {
          sessionStorage.setItem(
            "npg-user",
            JSON.stringify(userData)
          );
        }
      }
    } catch (error) {
      console.error(
        "❌ FETCH USER ERROR:",
        error.response?.data ||
          error.message
      );
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
    try {
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

      // IMPORTANT
      // Fetch MongoDB cart immediately
      await fetchCart(authToken);

      window.dispatchEvent(
        new Event(
          "npg-auth-change"
        )
      );

      return true;
    } catch (error) {
      console.error(
        "❌ LOGIN ERROR:",
        error
      );

      return false;
    }
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
      new Event(
        "npg-auth-change"
      )
    );

    navigate("/login");
  };

  // ==========================================
  // UPDATE USER
  // ==========================================

  const updateUser = (
    updatedUser
  ) => {
    setUser(updatedUser);

    if (
      localStorage.getItem(
        "npg-token"
      )
    ) {
      localStorage.setItem(
        "npg-user",
        JSON.stringify(updatedUser)
      );
    } else if (
      sessionStorage.getItem(
        "npg-token"
      )
    ) {
      sessionStorage.setItem(
        "npg-user",
        JSON.stringify(updatedUser)
      );
    }
  };

  // ==========================================
  // ADD TO CART
  // ==========================================

  const addToCart = async (
    productId
  ) => {
    if (!productId) {
      toast.error(
        "Product ID is missing."
      );

      return false;
    }

    const activeToken =
      token || getStoredToken();

    // User must be logged in
    if (!activeToken) {
      toast.error(
        "Please login before adding products."
      );

      navigate("/login");

      return false;
    }

    try {
      setCartLoading(true);

      console.log(
        "================================"
      );

      console.log(
        "🛒 ADDING PRODUCT:",
        productId
      );

      console.log(
        "🔐 TOKEN:",
        activeToken
          ? "TOKEN FOUND"
          : "NO TOKEN"
      );

      console.log(
        "================================"
      );

      const response =
        await axios.post(
          `${url}/api/cart/add`,
          {
            productId:
              String(productId),
          },
          {
            headers: {
              Authorization:
                `Bearer ${activeToken}`,
              "Content-Type":
                "application/json",
            },
          }
        );

      console.log(
        "🛒 ADD TO CART RESPONSE:",
        response.data
      );

      if (!response.data?.success) {
        toast.error(
          response.data?.message ||
            "Failed to add product"
        );

        return false;
      }

      // Get backend cart
      const backendItems =
        response.data?.cartItems ||
        response.data?.cart?.cartItems ||
        [];

      console.log(
        "🛒 BACKEND ITEMS:",
        backendItems
      );

      // Convert backend array
      const formattedCart =
        convertBackendCart(
          backendItems
        );

      console.log(
        "🛒 FRONTEND CART:",
        formattedCart
      );

      // Update React state
      setCartItems(
        formattedCart
      );

      // Save locally
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          formattedCart
        )
      );

      return true;
    } catch (error) {
      console.error(
        "❌ ADD TO CART ERROR:",
        error.response?.data ||
          error.message
      );

      if (
        error.response?.status ===
        401
      ) {
        toast.error(
          "Your session has expired. Please login again."
        );

        logout();

        return false;
      }

      toast.error(
        error.response?.data?.message ||
          "Failed to add product to cart"
      );

      return false;
    } finally {
      setCartLoading(false);
    }
  };

  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const increaseQuantity = async (
    productId
  ) => {
    return await addToCart(
      productId
    );
  };

  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const decreaseQuantity = async (
    productId
  ) => {
    if (!productId) {
      return false;
    }

    const activeToken =
      token || getStoredToken();

    // Guest cart
    if (!activeToken) {
      setCartItems(
        (current) => {
          const updated = {
            ...current,
          };

          const key =
            String(productId);

          const quantity =
            Number(
              updated[key] || 0
            );

          if (quantity <= 1) {
            delete updated[key];
          } else {
            updated[key] =
              quantity - 1;
          }

          return updated;
        }
      );

      return true;
    }

    try {
      setCartLoading(true);

      const response =
        await axios.post(
          `${url}/api/cart/remove`,
          {
            productId:
              String(productId),
          },
          {
            headers: {
              Authorization:
                `Bearer ${activeToken}`,
              "Content-Type":
                "application/json",
            },
          }
        );

      console.log(
        "🛒 DECREASE RESPONSE:",
        response.data
      );

      if (!response.data?.success) {
        toast.error(
          response.data?.message ||
            "Failed to update cart"
        );

        return false;
      }

      const backendItems =
        response.data?.cartItems ||
        response.data?.cart?.cartItems ||
        [];

      const formattedCart =
        convertBackendCart(
          backendItems
        );

      setCartItems(
        formattedCart
      );

      return true;
    } catch (error) {
      console.error(
        "❌ DECREASE ERROR:",
        error.response?.data ||
          error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update cart"
      );

      await fetchCart(
        activeToken
      );

      return false;
    } finally {
      setCartLoading(false);
    }
  };

  // ==========================================
  // REMOVE ENTIRE PRODUCT
  // ==========================================

  const removeFromCart =
    async (productId) => {
      if (!productId) {
        return false;
      }

      const key =
        String(productId);

      const quantity =
        Number(
          cartItems[key] || 0
        );

      if (quantity <= 0) {
        return false;
      }

      const activeToken =
        token || getStoredToken();

      // Guest cart
      if (!activeToken) {
        setCartItems(
          (current) => {
            const updated = {
              ...current,
            };

            delete updated[key];

            return updated;
          }
        );

        return true;
      }

      try {
        setCartLoading(true);

        /*
          Your backend /remove endpoint
          removes ONE quantity at a time.

          Example:
          quantity = 3

          Call remove 3 times.
        */

        for (
          let i = 0;
          i < quantity;
          i++
        ) {
          const response =
            await axios.post(
              `${url}/api/cart/remove`,
              {
                productId:
                  String(productId),
              },
              {
                headers: {
                  Authorization:
                    `Bearer ${activeToken}`,
                  "Content-Type":
                    "application/json",
                },
              }
            );

          if (
            !response.data?.success
          ) {
            break;
          }
        }

        await fetchCart(
          activeToken
        );

        return true;
      } catch (error) {
        console.error(
          "❌ REMOVE PRODUCT ERROR:",
          error.response?.data ||
            error.message
        );

        toast.error(
          error.response?.data?.message ||
            "Failed to remove item"
        );

        await fetchCart(
          activeToken
        );

        return false;
      } finally {
        setCartLoading(false);
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
      (total, quantity) => {
        return (
          total +
          Number(quantity || 0)
        );
      },
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
      (
        total,
        [productId, quantity]
      ) => {
        const price =
          getProductPrice(
            productId
          );

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