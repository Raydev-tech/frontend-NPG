import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Plus,
  ShoppingBag,
  Loader2,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { StoreContext } from "./context/StoreContext";

const API_URL = "https://npg-store.vercel.app";

const emptyAddress = {
  fullName: "",
  phoneNumber: "",
  pincode: "",
  area: "",
  city: "",
  state: "",
};

const money = (value) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

function getToken(contextToken) {
  return (
    contextToken ||
    localStorage.getItem("npg-token") ||
    sessionStorage.getItem("npg-token") ||
    localStorage.getItem("token") ||
    ""
  );
}

async function readResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const text = await response.text();
    throw new Error(
      `The server returned a non-JSON response (${response.status}). ` +
      "Check that the backend route is mounted and deployed."
    );
  }

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Request failed.");
  }

  return data;
}

export default function OrderSummary() {
  const navigate = useNavigate();

  const {
    products = [],
    cartItems = {},
    getCartAmount,
    clearCart: contextClearCart,
    token: contextToken,
  } = useContext(StoreContext);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [addressForm, setAddressForm] = useState(emptyAddress);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [savingAddress, setSavingAddress] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const token = getToken(contextToken);

  // Supports either { productId: quantity } or an array-based cart.
  const cartLines = useMemo(() => {
    const lines = [];

    if (Array.isArray(cartItems)) {
      for (const entry of cartItems) {
        const product = entry.product || entry;
        const productId = product?._id || entry.productId;
        const quantity = Number(entry.quantity) || 1;

        if (productId) {
          const liveProduct =
            products.find((p) => p._id === productId) || product;

          lines.push({ product: liveProduct, quantity });
        }
      }

      return lines;
    }

    for (const [productId, rawQuantity] of Object.entries(cartItems || {})) {
      const quantity =
        typeof rawQuantity === "number"
          ? rawQuantity
          : Number(rawQuantity?.quantity) || 0;

      const product =
        products.find((p) => p._id === productId) ||
        rawQuantity?.product ||
        null;

      if (product && quantity > 0) {
        lines.push({ product, quantity });
      }
    }

    return lines;
  }, [cartItems, products]);

  const subtotal = useMemo(() => {
    const calculated = cartLines.reduce((sum, line) => {
      const price = Number(
        line.product?.offerPrice ?? line.product?.price ?? 0
      );

      return sum + price * line.quantity;
    }, 0);

    // Prefer the cart calculation if it is valid and there are cart items.
    if (cartLines.length && typeof getCartAmount === "function") {
      const contextAmount = Number(getCartAmount());
      if (Number.isFinite(contextAmount) && contextAmount >= 0) {
        return contextAmount;
      }
    }

    return calculated;
  }, [cartLines, getCartAmount]);

  const shipping = subtotal > 0 ? 1500 : 0;
  const tax = Math.floor(subtotal * 0.02);
  const total = subtotal + shipping + tax;

  useEffect(() => {
    let cancelled = false;

    async function loadAddresses() {
      if (!token) {
        setLoadingAddresses(false);
        return;
      }

      setLoadingAddresses(true);

      try {
        const response = await fetch(`${API_URL}/api/address/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await readResponse(response);
        if (cancelled) return;

        const saved = Array.isArray(data.addresses) ? data.addresses : [];
        setAddresses(saved);

        if (saved.length === 0) {
          setShowAddressForm(true);
        } else {
          setSelectedAddressIndex(0);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Address loading error:", error);
          toast.error(error.message || "Could not load saved addresses.");
        }
      } finally {
        if (!cancelled) setLoadingAddresses(false);
      }
    }

    loadAddresses();

    return () => {
      cancelled = true;
    };
  }, [token]);

  function updateAddressField(event) {
    const { name, value } = event.target;
    setAddressForm((previous) => ({ ...previous, [name]: value }));
  }

  async function saveAddress(event) {
    event.preventDefault();

    if (!token) {
      toast.error("Please log in before adding an address.");
      navigate("/login");
      return;
    }

    setSavingAddress(true);

    try {
      const response = await fetch(`${API_URL}/api/address/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressForm),
      });

      const data = await readResponse(response);

      // Use the saved addresses returned by the backend when available.
      let updatedAddresses = Array.isArray(data.addresses)
        ? data.addresses
        : null;

      if (!updatedAddresses) {
        const addressResponse = await fetch(`${API_URL}/api/address/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const addressData = await readResponse(addressResponse);
        updatedAddresses = Array.isArray(addressData.addresses)
          ? addressData.addresses
          : [];
      }

      setAddresses(updatedAddresses);
      setSelectedAddressIndex(Math.max(0, updatedAddresses.length - 1));
      setAddressForm(emptyAddress);
      setShowAddressForm(false);
      toast.success("Delivery address saved.");
    } catch (error) {
      console.error("Address save error:", error);
      toast.error(error.message || "Could not save the address.");
    } finally {
      setSavingAddress(false);
    }
  }

  async function createOrder() {
    if (!token) {
      toast.error("Please log in to place your order.");
      navigate("/login");
      return;
    }

    if (cartLines.length === 0) {
      toast.error("Your cart is empty.");
      navigate("/cart");
      return;
    }

    const selectedAddress = addresses[selectedAddressIndex];

    if (!selectedAddress) {
      toast.error("Please add and select a delivery address.");
      setShowAddressForm(true);
      return;
    }

    const orderItems = cartLines.map(({ product, quantity }) => ({
      product: product._id,
      name: product.name || product.title || "NPG product",
      image: Array.isArray(product.image)
        ? product.image[0] || ""
        : product.image || "",
      price: Number(product.offerPrice ?? product.price ?? 0),
      quantity,
    }));

    if (
      orderItems.some(
        (item) =>
          !Number.isFinite(item.price) ||
          item.price < 0 ||
          !Number.isInteger(item.quantity) ||
          item.quantity < 1
      )
    ) {
      toast.error("One or more cart items have invalid prices or quantities.");
      return;
    }

    setPlacingOrder(true);

    try {
      const response = await fetch(`${API_URL}/api/order/place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: orderItems,
          address: selectedAddress,
          method: "COD",
          shipping,
          tax,
        }),
      });

      const data = await readResponse(response);

      if (!data.order?._id) {
        throw new Error("The server did not return a saved order.");
      }

      // Only clear the cart after the backend confirms the saved order.
      try {
        if (typeof contextClearCart === "function") {
          await contextClearCart();
        }

        localStorage.removeItem("npg-cart");
        localStorage.removeItem("cartItems");
      } catch (cartError) {
        console.error("Order saved, but clearing the cart failed:", cartError);
      }

      localStorage.setItem("npg-last-order", JSON.stringify(data.order));

      toast.success("Your order has been saved!");
      navigate("/order-placed", { state: { order: data.order } });
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error(error.message || "Could not place your order.");
    } finally {
      setPlacingOrder(false);
    }
  }

  if (loadingAddresses) {
    return (
      <div className="flex min-h-64 items-center justify-center text-amber-500">
        <Loader2 className="mr-2 animate-spin" size={22} />
        Loading your delivery addresses...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#100704] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#e59a38]">
              NPG Clothing
            </p>
            <h1 className="mt-2 text-3xl font-bold">Checkout</h1>
            <p className="mt-2 text-sm text-gray-400">
              Confirm your delivery address and review your order.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <MapPin className="text-[#e59a38]" size={20} />
                Delivery address
              </h2>

              <button
                type="button"
                onClick={() => setShowAddressForm((value) => !value)}
                className="flex items-center gap-1 text-sm text-[#e59a38] hover:text-amber-300"
              >
                <Plus size={17} />
                Add address
              </button>
            </div>

            {addresses.length > 0 ? (
              <div className="space-y-3">
                {addresses.map((address, index) => (
                  <label
                    key={address._id || index}
                    className={`flex cursor-pointer gap-3 rounded-xl border p-4 ${
                      selectedAddressIndex === index
                        ? "border-[#e59a38] bg-[#e59a38]/10"
                        : "border-white/10"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryAddress"
                      checked={selectedAddressIndex === index}
                      onChange={() => setSelectedAddressIndex(index)}
                      className="mt-1 accent-[#e59a38]"
                    />

                    <span className="text-sm leading-6 text-gray-300">
                      <strong className="block text-white">
                        {address.fullName}
                      </strong>
                      {address.phoneNumber}
                      <br />
                      {address.area}, {address.city}, {address.state}
                      {address.pincode ? `, ${address.pincode}` : ""}
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                You have no saved addresses. Add one below.
              </p>
            )}

            {showAddressForm && (
              <form onSubmit={saveAddress} className="mt-5 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["fullName", "Full name"],
                    ["phoneNumber", "Phone number"],
                    ["pincode", "Postcode / ZIP (optional)"],
                    ["area", "Street address / area"],
                    ["city", "City"],
                    ["state", "State"],
                  ].map(([name, placeholder]) => (
                    <input
                      key={name}
                      name={name}
                      value={addressForm[name]}
                      onChange={updateAddressField}
                      placeholder={placeholder}
                      required={name !== "pincode"}
                      className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-[#e59a38]"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={savingAddress}
                  className="rounded-lg bg-[#e59a38] px-5 py-3 text-sm font-semibold text-black disabled:opacity-60"
                >
                  {savingAddress ? "Saving address..." : "Save address"}
                </button>
              </form>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <ShoppingBag className="text-[#e59a38]" size={20} />
              Items in your order ({cartLines.length})
            </h2>

            {cartLines.length === 0 ? (
              <p className="text-sm text-gray-400">
                Your cart is empty. Add products before checking out.
              </p>
            ) : (
              <div className="space-y-4">
                {cartLines.map(({ product, quantity }, index) => {
                  const image = Array.isArray(product.image)
                    ? product.image[0]
                    : product.image;

                  const price = Number(
                    product.offerPrice ?? product.price ?? 0
                  );

                  return (
                    <div
                      key={product._id || index}
                      className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={product.name || "Product"}
                          className="h-20 w-20 rounded-lg bg-white/5 object-cover"
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-white/5 text-xs text-gray-500">
                          No image
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="font-medium">
                          {product.name || product.title || "NPG product"}
                        </p>
                        <p className="mt-1 text-sm text-gray-400">
                          Quantity: {quantity}
                        </p>
                        <p className="mt-1 text-sm text-[#e59a38]">
                          {money(price)} each
                        </p>
                      </div>

                      <p className="text-sm font-semibold">
                        {money(price * quantity)}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.04] p-6 lg:sticky lg:top-6">
          <h2 className="text-xl font-bold">Order summary</h2>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between gap-4 text-gray-300">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <div className="flex justify-between gap-4 text-gray-300">
              <span>Shipping</span>
              <span>{money(shipping)}</span>
            </div>
            <div className="flex justify-between gap-4 text-gray-300">
              <span>Tax (2%)</span>
              <span>{money(tax)}</span>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between gap-4 text-lg font-bold">
                <span>Total</span>
                <span className="text-[#e59a38]">{money(total)}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-black/25 p-4 text-sm">
            <p className="font-semibold">Payment method</p>
            <p className="mt-1 text-gray-400">
              Cash on Delivery (COD)
            </p>
            <p className="mt-3 text-xs leading-5 text-gray-500">
              Payment is pending until the order is paid for and confirmed.
            </p>
          </div>

          <button
            type="button"
            onClick={createOrder}
            disabled={placingOrder || cartLines.length === 0}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#e59a38] px-5 py-4 font-bold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {placingOrder ? (
              <>
                <Loader2 size={19} className="animate-spin" />
                Saving order...
              </>
            ) : (
              "Place order"
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="mt-3 w-full rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 hover:bg-white/5"
          >
            Back to cart
          </button>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="mt-3 flex w-full items-center justify-center gap-2 text-sm text-gray-500 hover:text-white"
          >
            <Trash2 size={15} />
            Continue shopping
          </button>
        </aside>
      </div>
    </main>
  );
}