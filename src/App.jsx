import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Product from "./shop/id/page";
import Login from "./components/Login";
import Register from "./components/Register";
import OrderPlaced from "./components/OrderPlaced";
import UserOrder from "./pages/UserOrder";
import AddAddress from "./components/AddAddress";


function App() {
  // =====================================================
  // CART STATE
  // =====================================================

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("npg-cart");

      return savedCart
        ? JSON.parse(savedCart)
        : [];
    } catch (error) {
      console.error(
        "Error loading cart:",
        error
      );

      return [];
    }
  });

  // =====================================================
  // SAVE CART TO LOCAL STORAGE
  // =====================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        "npg-cart",
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error(
        "Error saving cart:",
        error
      );
    }
  }, [cartItems]);

  // =====================================================
  // ADD PRODUCT TO CART
  // =====================================================

  const addToCart = (product) => {
    if (!product) {
      return false;
    }

    // Check stock
    if (product.inStock === false) {
      toast.error(
        "🚫 This product is out of stock!",
        {
          duration: 2500,
          position: "top-center",
        }
      );

      return false;
    }

    // Get product ID
    const productId =
      product.id || product._id;

    // Update cart
    setCartItems((currentItems) => {
      const existingProduct =
        currentItems.find(
          (item) =>
            (item.id || item._id) ===
            productId
        );

      // ==============================================
      // PRODUCT ALREADY EXISTS
      // ==============================================

      if (existingProduct) {
        return currentItems.map((item) =>
          (item.id || item._id) ===
          productId
            ? {
                ...item,
                id: productId,
                quantity:
                  Number(
                    item.quantity || 1
                  ) + 1,
              }
            : item
        );
      }

      // ==============================================
      // NEW PRODUCT
      // ==============================================

      return [
        ...currentItems,
        {
          ...product,
          id: productId,
          quantity: 1,
        },
      ];
    });

    // Toast notification
    toast.success(
      `${product.name} added to cart!`,
      {
        duration: 2000,
        position: "top-center",
      }
    );

    return true;
  };

  // =====================================================
  // CART COUNT
  // =====================================================

  const cartCount = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen bg-[#100805] text-white">

      {/* =================================================
          TOAST NOTIFICATIONS
      ================================================= */}

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,

          style: {
            background: "#160a06",
            color: "#ffffff",
            border: "1px solid #e59a38",
            borderRadius: "0px",
            fontSize: "13px",
            fontWeight: "600",
          },

          success: {
            iconTheme: {
              primary: "#e59a38",
              secondary: "#000000",
            },
          },
        }}
      />

      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar cartCount={cartCount} />

      {/* =================================================
          ROUTES
      ================================================= */}

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* SHOP */}
        <Route
          path="/shop"
          element={
            <Shop
              cartItems={cartItems}
              setCartItems={setCartItems}
              addToCart={addToCart}
            />
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* ABOUT */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* CONTACT */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* CART */}
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />

        {/* PRODUCT DETAILS */}
        <Route
          path="/product/:id"
          element={
            <Product
              addToCart={addToCart}
            />
          }
        />

        <Route path="/order-placed" element={<OrderPlaced />} />
        <Route path="/userorder" element={<UserOrder />} />
        <Route path="/add-address" element={<AddAddress />} />

      </Routes>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />

    </div>
  );
}

export default App;