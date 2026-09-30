import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import OrderSummary from "./OrderSummary";

const Cart = () => {
  const navigate = useNavigate();

  // ==========================================
  // LOAD CART FROM LOCAL STORAGE
  // ==========================================

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("npg-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  });

  // ==========================================
  // SAVE CART TO LOCAL STORAGE
  // ==========================================

  useEffect(() => {
    try {
      if (cartItems.length === 0) {
        localStorage.removeItem("npg-cart");
      } else {
        localStorage.setItem("npg-cart", JSON.stringify(cartItems));
      }
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cartItems]);

  // ==========================================
  // GET PRODUCT ID
  // ==========================================

  const getProductId = (item) => {
    return item.id || item._id;
  };

  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        String(getProductId(item)) === String(id)
          ? {
              ...item,
              quantity: Number(item.quantity || 1) + 1,
            }
          : item
      )
    );
  };

  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        String(getProductId(item)) === String(id) &&
        Number(item.quantity || 1) > 1
          ? {
              ...item,
              quantity: Number(item.quantity || 1) - 1,
            }
          : item
      )
    );
  };

  // ==========================================
  // REMOVE ITEM
  // ==========================================

  const removeItem = (id) => {
    setCartItems((items) =>
      items.filter(
        (item) =>
          String(getProductId(item)) !== String(id)
      )
    );
  };

  // ==========================================
  // CLEAR CART
  // ==========================================

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("npg-cart");
  };

  // ==========================================
  // SUBTOTAL
  // ==========================================

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  // ==========================================
  // SHIPPING
  // SAME CALCULATION USED BY ORDER SUMMARY
  // ==========================================

  const shipping = subtotal > 0 ? 1500 : 0;

  // ==========================================
  // FINAL TOTAL
  // ==========================================

  const total = subtotal + shipping;

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#100704] px-5 pb-20 pt-32 text-white">
        <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center text-center">

          <div className="mb-8 grid h-24 w-24 place-items-center rounded-full border border-white/10 bg-[#1a0b07]">
            <ShoppingBag
              size={32}
              className="text-[#e59a38]"
            />
          </div>

          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#e59a38]">
            Your Bag
          </p>

          <h1 className="text-4xl font-black uppercase md:text-6xl">
            Your Cart Is Empty
          </h1>

          <p className="mt-5 max-w-md text-sm leading-7 text-white/40">
            You haven't added anything to your cart yet.
            Explore our collection and find something you love.
          </p>

          <Link
            to="/shop"
            className="mt-8 flex items-center gap-3 bg-[#e59a38] px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-black transition hover:bg-white"
          >
            <ArrowLeft size={15} />
            Shop NPG
          </Link>
        </div>
      </main>
    );
  }

  // ==========================================
  // CART PAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-[#100704] px-5 pb-20 pt-32 text-white md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-12 flex flex-col justify-between gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end">

          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#e59a38]">
              NPG Store
            </p>

            <h1 className="text-4xl font-black uppercase md:text-6xl">
              Shopping Cart
            </h1>

            <p className="mt-3 text-sm text-white/40">
              {cartItems.length}{" "}
              {cartItems.length === 1 ? "item" : "items"}{" "}
              in your bag
            </p>
          </div>

          {/* CLEAR CART */}
          <button
            onClick={clearCart}
            className="flex w-fit items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 transition hover:text-red-400"
          >
            <Trash2 size={14} />
            Clear Cart
          </button>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px]">

          {/* CART ITEMS */}
          <div className="space-y-4">

            {cartItems.map((item) => {
              const productId = getProductId(item);

              const image = Array.isArray(item.image)
                ? item.image[0]
                : item.image;

              const itemQuantity = Number(
                item.quantity || 1
              );

              const itemPrice = Number(
                item.price || 0
              );

              const itemTotal =
                itemPrice * itemQuantity;

              return (
                <div
                  key={productId}
                  className="border border-white/10 bg-[#140806] p-4 md:p-5"
                >
                  <div className="flex gap-5">

                    {/* PRODUCT IMAGE */}
                    <div className="h-32 w-24 flex-shrink-0 overflow-hidden bg-[#1a0b07] md:h-40 md:w-32">
                      <img
                        src={image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between">

                      <div>
                        <div className="flex items-start justify-between gap-4">

                          <div>
                            <h2 className="text-sm font-black uppercase md:text-base">
                              {item.name}
                            </h2>

                            {item.category && (
                              <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/30">
                                {item.category}
                              </p>
                            )}

                            {item.size && (
                              <p className="mt-2 text-[10px] uppercase tracking-wider text-white/50">
                                Size:{" "}
                                <span className="text-white">
                                  {item.size}
                                </span>
                              </p>
                            )}
                          </div>

                          {/* REMOVE */}
                          <button
                            onClick={() =>
                              removeItem(productId)
                            }
                            className="text-white/30 transition hover:text-red-400"
                            aria-label="Remove item"
                          >
                            <Trash2 size={17} />
                          </button>

                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">

                        {/* PRICE */}
                        <div>
                          <p className="text-xs text-white/40">
                            Unit Price
                          </p>

                          <p className="mt-1 text-sm font-bold text-[#e59a38]">
                            ₦{itemPrice.toLocaleString()}
                          </p>
                        </div>

                        {/* QUANTITY */}
                        <div className="flex items-center border border-white/20">

                          <button
                            onClick={() =>
                              decreaseQuantity(productId)
                            }
                            className="grid h-9 w-9 place-items-center transition hover:bg-white hover:text-black"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>

                          <span className="grid h-9 w-10 place-items-center border-x border-white/20 text-xs font-bold">
                            {itemQuantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(productId)
                            }
                            className="grid h-9 w-9 place-items-center transition hover:bg-white hover:text-black"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>

                        </div>

                        {/* TOTAL */}
                        <div className="text-right">
                          <p className="text-xs text-white/40">
                            Total
                          </p>

                          <p className="mt-1 text-sm font-bold">
                            ₦{itemTotal.toLocaleString()}
                          </p>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>

          {/* ORDER SUMMARY */}
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            cartCount={cartItems.reduce(
              (count, item) =>
                count + Number(item.quantity || 1),
              0
            )}
            clearCart={clearCart}
          />

        </div>
      </div>
    </main>
  );
};

export default Cart;