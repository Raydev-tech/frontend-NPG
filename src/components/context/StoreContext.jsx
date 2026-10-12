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

<<<<<<< HEAD
  // ==========================================
  // BACKEND URL
  // ==========================================

=======
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
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
<<<<<<< HEAD
  const [productsLoading, setProductsLoading] =
    useState(true);
  const [cartLoading, setCartLoading] =
    useState(false);

  // ==========================================
  // GET STORED TOKEN
=======
  const [productsLoading, setProductsLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);

  // ==========================================
  // GET AUTH TOKEN
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
  // ==========================================

  const getStoredToken = () => {
    return (
      localStorage.getItem("npg-token") ||
      sessionStorage.getItem("npg-token") ||
      ""
    );
  };

  // ==========================================
<<<<<<< HEAD
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
=======
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
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8

  const convertBackendCart = useCallback(
    (items = []) => {
      const formattedCart = {};

<<<<<<< HEAD
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
=======
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
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
            },
          }
        );

<<<<<<< HEAD
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
=======
        if (res.data?.success) {
          const backendCart =
            res.data.cart?.cartItems ||
            res.data.cartItems ||
            [];

          const formattedCart =
            convertBackendCart(backendCart);
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8

          setCartItems(formattedCart);

          localStorage.setItem(
            "cartItems",
            JSON.stringify(formattedCart)
          );
<<<<<<< HEAD
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
=======
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
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
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
<<<<<<< HEAD
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

=======
        // Load guest/local cart first
        const storedCart =
          localStorage.getItem("cartItems");

        if (storedCart) {
          try {
            setCartItems(
              JSON.parse(storedCart)
            );
          } catch {
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
            setCartItems({});
          }
        }

<<<<<<< HEAD
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
=======
        // Load authentication
        const storedToken =
          getStoredToken();

        const storedUser =
          localStorage.getItem("npg-user") ||
          sessionStorage.getItem("npg-user");
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8

        if (storedToken) {
          setToken(storedToken);

          if (storedUser) {
            try {
              setUser(
                JSON.parse(storedUser)
              );
            } catch (error) {
              console.error(
<<<<<<< HEAD
                "USER PARSE ERROR:",
=======
                "Failed to parse user:",
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
                error
              );
            }
          }

<<<<<<< HEAD
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
=======
          // Load backend cart
          await fetchCart(storedToken);
        }
      } catch (error) {
        console.error(
          "❌ Store initialization error:",
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
          error
        );
      } finally {
        setLoading(false);
      }
<<<<<<< HEAD
=======

      fetchProducts();
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
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
<<<<<<< HEAD
        "SAVE CART ERROR:",
=======
        "Failed to save cart:",
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
        error
      );
    }
  }, [cartItems]);

  // ==========================================
  // FETCH USER
  // ==========================================

  const fetchUserData = async (
<<<<<<< HEAD
    authToken = null
=======
    authToken
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
  ) => {
    try {
      const activeToken =
        authToken || getStoredToken();

<<<<<<< HEAD
      if (!activeToken) {
        return;
      }

      const response = await axios.get(
        `${url}/api/user/me`,
        {
          headers: {
            Authorization:
              `Bearer ${activeToken}`,
=======
      if (!activeToken) return;

      const res = await axios.get(
        `${url}/api/user/me`,
        {
          headers: {
            Authorization: `Bearer ${activeToken}`,
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
          },
        }
      );

<<<<<<< HEAD
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
=======
      if (res.data?.success === false) {
        throw new Error(
          res.data?.message ||
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
            "Failed to fetch user"
        );
      }

      const userData =
<<<<<<< HEAD
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
=======
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
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
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
<<<<<<< HEAD
      new Event(
        "npg-auth-change"
      )
=======
      new Event("npg-auth-change")
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
    );

    navigate("/login");
  };

  // ==========================================
  // UPDATE USER
  // ==========================================

<<<<<<< HEAD
  const updateUser = (
    updatedUser
  ) => {
    setUser(updatedUser);

    if (
      localStorage.getItem(
        "npg-token"
      )
=======
  const updateUser = (updatedUser) => {
    setUser(updatedUser);

    const activeToken =
      getStoredToken();

    if (
      localStorage.getItem("npg-token")
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
    ) {
      localStorage.setItem(
        "npg-user",
        JSON.stringify(updatedUser)
      );
    } else if (
<<<<<<< HEAD
      sessionStorage.getItem(
        "npg-token"
      )
=======
      sessionStorage.getItem("npg-token")
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
    ) {
      sessionStorage.setItem(
        "npg-user",
        JSON.stringify(updatedUser)
      );
    }
  };

  // ==========================================
  // ADD TO CART
<<<<<<< HEAD
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
=======
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
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8

    const activeToken =
      token || getStoredToken();

<<<<<<< HEAD
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
=======
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
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
    }
  };

  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const increaseQuantity = async (
    productId
  ) => {
<<<<<<< HEAD
    return await addToCart(
      productId
    );
=======
    await addToCart(productId);
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
  };

  // ==========================================
  // DECREASE QUANTITY
<<<<<<< HEAD
=======
  // POST /api/cart/remove
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
  // ==========================================

  const decreaseQuantity = async (
    productId
  ) => {
<<<<<<< HEAD
    if (!productId) {
      return false;
    }

=======
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

>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
    const activeToken =
      token || getStoredToken();

    // Guest cart
    if (!activeToken) {
<<<<<<< HEAD
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

=======
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

>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
      toast.error(
        error.response?.data?.message ||
          "Failed to update cart"
      );
<<<<<<< HEAD

      await fetchCart(
        activeToken
      );

      return false;
    } finally {
      setCartLoading(false);
=======
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
    }
  };

  // ==========================================
<<<<<<< HEAD
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
=======
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
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8

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
<<<<<<< HEAD
      (total, quantity) => {
        return (
          total +
          Number(quantity || 0)
        );
      },
=======
      (total, quantity) =>
        total +
        Number(quantity || 0),
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
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
<<<<<<< HEAD
      (
        total,
        [productId, quantity]
      ) => {
        const price =
          getProductPrice(
            productId
          );
=======
      (total, [productId, quantity]) => {
        const price =
          getProductPrice(productId);
>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8

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
<<<<<<< HEAD
=======

>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
    fetchCart,

    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,

    clearCart,

    getCartCount,
    getCartAmount,
<<<<<<< HEAD
=======

>>>>>>> 5028b29d645aa6ea009c79d42fc9b1eaa3c340c8
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