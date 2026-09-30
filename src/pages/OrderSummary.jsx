import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OrderSummary = ({
  subtotal,
  shipping,
  total,
  cartCount,
  clearCart,
}) => {
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] =
    useState(null);

  const [isDropdownOpen, setIsDropdownOpen] =
    useState(false);

  const [promoCode, setPromoCode] = useState("");

  const [isPlacingOrder, setIsPlacingOrder] =
    useState(false);

  // ==========================================
  // LOAD SAVED ADDRESS
  // ==========================================

  useEffect(() => {
    const savedAddress =
      localStorage.getItem("npg-address");

    if (savedAddress) {
      try {
        const address = JSON.parse(savedAddress);
        setSelectedAddress(address);
      } catch (error) {
        console.error(
          "Error loading address:",
          error
        );
      }
    }
  }, []);

  // ==========================================
  // SELECT ADDRESS
  // ==========================================

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);

    localStorage.setItem(
      "npg-address",
      JSON.stringify(address)
    );

    setIsDropdownOpen(false);
  };

  // ==========================================
  // CREATE ORDER
  // ==========================================

  const createOrder = () => {
    if (!selectedAddress) {
      toast.error(
        "Please add a shipping address first."
      );

      navigate("/add-address");
      return;
    }

    if (cartCount === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsPlacingOrder(true);

    setTimeout(() => {
      try {
        const existingOrders = JSON.parse(
          localStorage.getItem("npg-orders") || "[]"
        );

        const orderDetails = {
          _id: `NPG${Date.now()}`,

          address: selectedAddress,

          itemsCount: cartCount,

          subtotal: subtotal,

          shipping: shipping,

          amount: total,

          method: "Cash on Delivery",

          paymentStatus: "Pending",

          status: "Processing",

          date: new Date().toISOString(),
        };

        // Save all orders
        localStorage.setItem(
          "npg-orders",
          JSON.stringify([
            orderDetails,
            ...existingOrders,
          ])
        );

        // Save latest order
        localStorage.setItem(
          "npg-last-order",
          JSON.stringify(orderDetails)
        );

        // Clear cart
        clearCart();

        toast.success(
          "Order placed successfully!"
        );

        setIsPlacingOrder(false);

        navigate("/order-placed");
      } catch (error) {
        console.error(
          "Order creation failed:",
          error
        );

        toast.error(
          "Something went wrong. Please try again."
        );

        setIsPlacingOrder(false);
      }
    }, 1200);
  };

  return (
    <div className="w-full lg:w-[420px] bg-[#160906] border border-white/10 rounded-lg p-6 text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">

        <div>
          <p className="text-xs uppercase tracking-[2px] text-[#e59a38]">
            NPG Clothing
          </p>

          <h2 className="text-xl md:text-2xl font-semibold mt-1">
            Order Summary
          </h2>
        </div>

        <div className="text-[#e59a38] text-xl">
          🛍
        </div>

      </div>

      <div className="h-px bg-white/10 mb-6" />

      {/* SHIPPING ADDRESS */}
      <div className="mb-6">

        <div className="flex items-center justify-between mb-2">

          <label className="text-sm font-medium uppercase tracking-wide text-gray-300">
            Delivery Address
          </label>

          <button
            onClick={() =>
              navigate("/add-address")
            }
            className="text-xs text-[#e59a38] hover:text-[#f0aa4d] transition"
          >
            + Add New
          </button>

        </div>

        <div className="relative">

          <button
            type="button"
            onClick={() =>
              setIsDropdownOpen(
                !isDropdownOpen
              )
            }
            className="w-full bg-[#1f0d09] border border-white/10 rounded-md px-4 py-3 text-left hover:border-[#e59a38]/60 transition"
          >

            {selectedAddress ? (
              <div>

                <p className="font-medium text-white">
                  {selectedAddress.fullName}
                </p>

                <p className="text-sm text-gray-400 mt-1 truncate">
                  {selectedAddress.area},{" "}
                  {selectedAddress.city},{" "}
                  {selectedAddress.state}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {selectedAddress.phoneNumber}
                </p>

              </div>
            ) : (
              <span className="text-gray-500">
                Select delivery address
              </span>
            )}

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {isDropdownOpen
                ? "⌃"
                : "⌄"}
            </span>

          </button>

          {/* DROPDOWN */}
          {isDropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-[#1a0b07] border border-white/10 rounded-md shadow-xl z-30 overflow-hidden">

              {selectedAddress ? (
                <button
                  type="button"
                  onClick={() =>
                    handleAddressSelect(
                      selectedAddress
                    )
                  }
                  className="w-full text-left px-4 py-3 hover:bg-white/5 transition"
                >

                  <p className="font-medium">
                    {selectedAddress.fullName}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    {selectedAddress.area},{" "}
                    {selectedAddress.city},{" "}
                    {selectedAddress.state}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {selectedAddress.pincode}
                  </p>

                </button>
              ) : (
                <div className="px-4 py-4 text-sm text-gray-500">
                  No saved address
                </div>
              )}

              <button
                type="button"
                onClick={() =>
                  navigate("/add-address")
                }
                className="w-full px-4 py-3 text-sm text-[#e59a38] border-t border-white/10 hover:bg-white/5 transition"
              >
                + Add New Address
              </button>

            </div>
          )}

        </div>
      </div>

      <div className="h-px bg-white/10 mb-5" />

      {/* CART TOTALS */}
      <div className="space-y-4">

        <div className="flex justify-between text-sm">
          <p className="text-gray-400">
            Items ({cartCount})
          </p>

          <p className="text-gray-200">
            ₦{subtotal.toLocaleString()}
          </p>
        </div>

        <div className="flex justify-between text-sm">
          <p className="text-gray-400">
            Shipping Fee
          </p>

          <p
            className={
              shipping === 0
                ? "text-[#e59a38]"
                : "text-gray-200"
            }
          >
            {shipping === 0
              ? "Free"
              : `₦${shipping.toLocaleString()}`}
          </p>
        </div>

      </div>

      {/* TOTAL */}
      <div className="border-t border-white/10 mt-5 pt-5">

        <div className="flex justify-between items-center">

          <p className="text-lg font-semibold">
            Total
          </p>

          <p className="text-xl font-semibold text-[#e59a38]">
            ₦{total.toLocaleString()}
          </p>

        </div>

      </div>

      {/* PLACE ORDER */}
      <button
        type="button"
        onClick={createOrder}
        disabled={isPlacingOrder}
        className={`w-full py-3.5 mt-6 rounded-md font-medium uppercase tracking-wide transition ${
          isPlacingOrder
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-[#e59a38] text-black hover:bg-[#f0aa4d]"
        }`}
      >

        {isPlacingOrder ? (
          <span className="flex items-center justify-center gap-2">

            <svg
              className="animate-spin h-5 w-5"
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

          </span>
        ) : (
          "Place Order"
        )}

      </button>

      {/* SECURITY NOTE */}
      <p className="text-center text-xs text-gray-500 mt-4">
        Your order details are securely saved.
      </p>

    </div>
  );
};

export default OrderSummary;