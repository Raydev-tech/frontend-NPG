import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OrderSummary = ({
  cartItems = {},
  getCartCount,
  getCartAmount,
  clearCart,
}) => {
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] =
    useState(null);

  const [isDropdownOpen, setIsDropdownOpen] =
    useState(false);

  const [userAddresses, setUserAddresses] =
    useState([]);

  const [isPlacingOrder, setIsPlacingOrder] =
    useState(false);

  // ==========================================
  // LOAD ADDRESSES FROM LOCAL STORAGE
  // ==========================================

  useEffect(() => {
    try {
      const savedAddresses =
        localStorage.getItem("npg-addresses");

      if (savedAddresses) {
        const addresses = JSON.parse(savedAddresses);

        setUserAddresses(addresses);

        // Automatically select first address
        if (addresses.length > 0) {
          setSelectedAddress(addresses[0]);
        }
      }
    } catch (error) {
      console.error(
        "Failed to load addresses:",
        error
      );
    }
  }, []);

  // ==========================================
  // SELECT ADDRESS
  // ==========================================

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  // ==========================================
  // GET CART ITEMS
  // ==========================================

  const getOrderItems = () => {
    // If cartItems is an object:
    if (
      cartItems &&
      !Array.isArray(cartItems) &&
      typeof cartItems === "object"
    ) {
      return Object.entries(cartItems).map(
        ([product, quantity]) => ({
          product,
          quantity: Number(quantity),
        })
      );
    }

    // If cartItems is already an array:
    if (Array.isArray(cartItems)) {
      return cartItems.map((item) => ({
        product: item,
        quantity: Number(
          item.quantity || 1
        ),
      }));
    }

    return [];
  };

  // ==========================================
  // PLACE ORDER
  // ==========================================

  const createOrder = async () => {
    // Check address
    if (!selectedAddress) {
      toast.error(
        "Please select an address before placing an order."
      );
      return;
    }

    // Check cart
    if (getCartCount() <= 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsPlacingOrder(true);

    try {
      const cartAmount = getCartAmount();

      // 2% tax
      const tax = Math.floor(
        cartAmount * 0.02
      );

      // Final amount
      const totalAmount =
        cartAmount + tax;

      // Get current cart items
      const orderItems = getOrderItems();

      // ========================================
      // GET EXISTING ORDERS
      // ========================================

      const existingOrders = JSON.parse(
        localStorage.getItem("npg-orders") ||
          "[]"
      );

      // ========================================
      // CREATE NEW ORDER
      // ========================================

      const newOrder = {
        _id: `NPG${Date.now()}`,

        date: new Date().toISOString(),

        items: orderItems,

        address: selectedAddress,

        method: "COD",

        amount: totalAmount,

        paymentStatus: "Pending",

        status: "Processing",
      };

      // ========================================
      // SAVE ORDER
      // ========================================

      localStorage.setItem(
        "npg-orders",
        JSON.stringify([
          newOrder,
          ...existingOrders,
        ])
      );

      // ========================================
      // CLEAR CART ONLY AFTER SUCCESS
      // ========================================

      clearCart();

      localStorage.removeItem("npg-cart");

      // ========================================
      // SUCCESS MESSAGE
      // ========================================

      toast.success(
        "Order placed successfully!"
      );

      // ========================================
      // GO TO ORDER SUCCESS PAGE
      // ========================================

      setTimeout(() => {
        navigate("/order-placed");
      }, 1000);
    } catch (error) {
      console.error(
        "Order placement error:",
        error
      );

      toast.error(
        "Failed to place order. Please try again."
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // ==========================================
  // TOTALS
  // ==========================================

  const cartAmount = getCartAmount();

  const tax = Math.floor(
    cartAmount * 0.02
  );

  const totalAmount =
    cartAmount + tax;

  // ==========================================
  // COMPONENT
  // ==========================================

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5 mt-10 md:mt-0">

      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Order Summary
      </h2>

      <hr className="border-gray-500/30 my-5" />

      <div className="space-y-6">

        {/* =================================
            ADDRESS
        ================================== */}

        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>

          <div className="relative inline-block w-full text-sm border rounded">

            <button
              type="button"
              className="w-full text-left px-4 pr-2 py-3 bg-white text-gray-700"
              onClick={() =>
                setIsDropdownOpen(
                  !isDropdownOpen
                )
              }
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>

              <svg
                className={`w-5 h-5 float-right transition-transform ${
                  isDropdownOpen
                    ? "rotate-0"
                    : "-rotate-90"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5 max-h-60 overflow-y-auto">

                {userAddresses.length === 0 ? (
                  <li className="px-4 py-3 text-gray-500">
                    No addresses found
                  </li>
                ) : (
                  userAddresses.map(
                    (address, index) => (
                      <li
                        key={index}
                        className="px-4 py-3 hover:bg-gray-500/10 cursor-pointer"
                        onClick={() =>
                          handleAddressSelect(
                            address
                          )
                        }
                      >
                        {address.fullName},{" "}
                        {address.area},{" "}
                        {address.pincode},{" "}
                        {address.city},{" "}
                        {address.state}
                      </li>
                    )
                  )
                )}

                {/* ADD ADDRESS */}

                <li
                  onClick={() =>
                    navigate("/add-address")
                  }
                  className="px-4 py-3 hover:bg-gray-500/10 cursor-pointer text-center text-green-700 border-t"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* =================================
            PROMO CODE
        ================================== */}

        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Promo Code
          </label>

          <div className="flex flex-col gap-3">

            <input
              type="text"
              placeholder="Enter promo code"
              className="w-full p-2.5 border text-gray-600 outline-none"
            />

            <button
              type="button"
              className="bg-green-600 text-white px-9 py-2 hover:bg-green-700"
              onClick={() =>
                toast.success(
                  "Promo code feature coming soon"
                )
              }
            >
              Apply
            </button>

          </div>
        </div>

        <hr className="border-gray-500/30 my-5" />

        {/* =================================
            TOTALS
        ================================== */}

        <div className="space-y-4">

          {/* ITEMS */}

          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">
              Items ({getCartCount()})
            </p>

            <p className="text-gray-800">
              ₦{cartAmount.toLocaleString()}
            </p>
          </div>

          {/* SHIPPING */}

          <div className="flex justify-between">
            <p className="text-gray-600">
              Shipping Fee
            </p>

            <p className="font-medium text-gray-800">
              Free
            </p>
          </div>

          {/* TAX */}

          <div className="flex justify-between">
            <p className="text-gray-600">
              Tax (2%)
            </p>

            <p className="font-medium text-gray-800">
              ₦{tax.toLocaleString()}
            </p>
          </div>

          {/* TOTAL */}

          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>

            <p>
              ₦{totalAmount.toLocaleString()}
            </p>
          </div>

        </div>
      </div>

      {/* =================================
          PLACE ORDER BUTTON
      ================================== */}

      <button
        onClick={createOrder}
        disabled={isPlacingOrder}
        className={`w-full py-3 mt-5 text-white font-medium transition duration-300 ${
          isPlacingOrder
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isPlacingOrder ? (
          <div className="flex items-center justify-center gap-2">

            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />

              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>

            Placing Order...

          </div>
        ) : (
          "Place Order"
        )}
      </button>
    </div>
  );
};

export default OrderSummary;