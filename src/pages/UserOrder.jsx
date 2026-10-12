import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  RefreshCw,
  ShoppingBag,
  MapPin,
  CreditCard,
  CalendarDays,
  Loader2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

const API_URL = "https://npg-store.vercel.app";

const money = (value) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

function getToken() {
  return (
    localStorage.getItem("npg-token") ||
    sessionStorage.getItem("npg-token") ||
    localStorage.getItem("token") ||
    ""
  );
}

function formatDate(value) {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return date.toLocaleString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusClass(status) {
  switch (String(status || "").toLowerCase()) {
    case "delivered":
      return "border-green-500/30 bg-green-500/10 text-green-400";
    case "shipped":
      return "border-blue-500/30 bg-blue-500/10 text-blue-400";
    case "processing":
      return "border-amber-500/30 bg-amber-500/10 text-amber-400";
    case "cancelled":
      return "border-red-500/30 bg-red-500/10 text-red-400";
    default:
      return "border-white/15 bg-white/5 text-gray-300";
  }
}

function paymentClass(status) {
  switch (String(status || "").toLowerCase()) {
    case "paid":
      return "text-green-400";
    case "failed":
      return "text-red-400";
    case "refunded":
      return "text-blue-400";
    default:
      return "text-amber-400";
  }
}

function addressText(address) {
  if (!address) return "No delivery address saved on this order.";

  return [
    address.area,
    address.city,
    address.state,
    address.pincode,
  ]
    .filter(Boolean)
    .join(", ");
}

function getOrderItem(item) {
  const product =
    item.product && typeof item.product === "object"
      ? item.product
      : null;

  const image = Array.isArray(item.image)
    ? item.image[0]
    : item.image;

  const productImage = Array.isArray(product?.image)
    ? product.image[0]
    : product?.image;

  return {
    id: product?._id || item.product || item._id,
    name: item.name || product?.name || "NPG product",
    image: image || productImage || "",
    price: Number(
      item.price ??
      item.offerPrice ??
      product?.offerPrice ??
      product?.price ??
      0
    ),
    quantity: Number(item.quantity) || 1,
  };
}

function OrderCard({ order }) {
  const items = Array.isArray(order.items) ? order.items : [];

  const computedSubtotal = items.reduce((sum, item) => {
    const normalized = getOrderItem(item);
    return sum + normalized.price * normalized.quantity;
  }, 0);

  const subtotal =
    Number.isFinite(Number(order.subtotal)) &&
    order.subtotal !== undefined
      ? Number(order.subtotal)
      : computedSubtotal;

  const shipping = Number(order.shipping) || 0;
  const tax = Number(order.tax) || 0;
  const total = Number(order.amount ?? subtotal + shipping + tax);

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
      <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            Order reference
          </p>
          <h2 className="mt-1 break-all font-bold text-white">
            {order._id || order.orderId || "Order"}
          </h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-gray-400">
            <CalendarDays size={15} />
            {formatDate(order.date || order.createdAt)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${statusClass(
              order.status
            )}`}
          >
            {order.status || "Order Placed"}
          </span>

          <span
            className={`rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-semibold ${paymentClass(
              order.paymentStatus
            )}`}
          >
            Payment: {order.paymentStatus || "Pending"}
          </span>
        </div>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-[1.3fr_0.7fr]">
        <section>
          <h3 className="mb-4 flex items-center gap-2 font-semibold">
            <ShoppingBag size={18} className="text-[#e59a38]" />
            Ordered products ({items.length})
          </h3>

          {items.length === 0 ? (
            <p className="text-sm text-gray-500">
              Product details are unavailable for this order.
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => {
                const product = getOrderItem(item);

                return (
                  <div
                    key={product.id || index}
                    className="flex items-center gap-3"
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-20 w-20 shrink-0 rounded-xl bg-white/5 object-cover"
                      />
                    ) : (
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xs text-gray-500">
                        No image
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="break-words font-medium text-white">
                        {product.name}
                      </p>
                      <p className="mt-1 text-sm text-gray-400">
                        Quantity: {product.quantity}
                      </p>
                      <p className="mt-1 text-sm text-gray-400">
                        Unit price: {money(product.price)}
                      </p>
                    </div>

                    <p className="shrink-0 text-right text-sm font-semibold text-[#e59a38]">
                      {money(product.price * product.quantity)}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <aside className="space-y-5">
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="mb-3 flex items-center gap-2 font-semibold">
              <MapPin size={18} className="text-[#e59a38]" />
              Delivery details
            </h3>

            {order.address ? (
              <div className="space-y-1 text-sm leading-6 text-gray-400">
                <p className="font-medium text-white">
                  {order.address.fullName || "Customer"}
                </p>
                <p>{order.address.phoneNumber || "No phone number"}</p>
                <p>{addressText(order.address)}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No delivery address was saved with this order.
              </p>
            )}
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="mb-3 flex items-center gap-2 font-semibold">
              <CreditCard size={18} className="text-[#e59a38]" />
              Payment details
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-3 text-gray-400">
                <span>Method</span>
                <span className="text-right text-white">
                  {order.method || "COD"}
                </span>
              </div>

              <div className="flex justify-between gap-3 text-gray-400">
                <span>Payment status</span>
                <span className={`text-right font-medium ${paymentClass(order.paymentStatus)}`}>
                  {order.paymentStatus || "Pending"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="mb-3 font-semibold">Price breakdown</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-3 text-gray-400">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>

              <div className="flex justify-between gap-3 text-gray-400">
                <span>Shipping</span>
                <span>{money(shipping)}</span>
              </div>

              <div className="flex justify-between gap-3 text-gray-400">
                <span>Tax</span>
                <span>{money(tax)}</span>
              </div>

              <div className="flex justify-between gap-3 border-t border-white/10 pt-3 font-bold">
                <span>Total {order.paymentStatus === "Paid" ? "paid" : "due"}</span>
                <span className="text-[#e59a38]">{money(total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

export default function UserOrder() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async (isRefresh = false) => {
    const token = getToken();

    if (!token) {
      setError("Please log in to view your orders.");
      setLoading(false);
      setRefreshing(false);
      return;
    }

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const response = await fetch(`${API_URL}/api/order/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          "The server returned HTML instead of JSON. Check the /api/order/user backend route and deployment."
        );
      }

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Could not fetch your orders.");
      }

      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch (fetchError) {
      console.error("Fetching orders failed:", fetchError);
      setError(fetchError.message || "Unable to load your orders.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <main className="min-h-screen bg-[#100704] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#e59a38]">
              NPG Clothing
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              My Orders
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              View your purchases, delivery details, payment status, and totals.
            </p>
          </div>

          <button
            type="button"
            onClick={() => fetchOrders(true)}
            disabled={loading || refreshing}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm hover:bg-white/5 disabled:opacity-50"
          >
            {refreshing ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <RefreshCw size={17} />
            )}
            Refresh orders
          </button>
        </div>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center text-[#e59a38]">
            <Loader2 className="mr-3 animate-spin" size={24} />
            Loading your orders...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-1 shrink-0 text-red-400" size={22} />
              <div>
                <h2 className="font-semibold">We couldn't load your orders</h2>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  {error}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {!getToken() && (
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="rounded-lg bg-[#e59a38] px-4 py-2.5 text-sm font-semibold text-black"
                    >
                      Log in
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => fetchOrders(true)}
                    className="rounded-lg border border-white/10 px-4 py-2.5 text-sm"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-6 py-16 text-center">
            <Package className="mx-auto text-[#e59a38]" size={48} />
            <h2 className="mt-5 text-xl font-bold">No orders yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
              When you place an order, it will be saved to your account and
              appear here.
            </p>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#e59a38] px-5 py-3 font-semibold text-black hover:bg-amber-300"
            >
              Start shopping
              <ChevronRight size={18} />
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between gap-3 text-sm text-gray-400">
              <span>
                {orders.length} {orders.length === 1 ? "order" : "orders"} found
              </span>
              <span>Newest orders first</span>
            </div>

            <div className="space-y-6">
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}