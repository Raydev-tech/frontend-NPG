import React, { useEffect, useState } from "react";
import {
  Package,
  MapPin,
  CreditCard,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://npg-store.vercel.app";

  // Get token from localStorage or sessionStorage
  const getToken = () => {
    return (
      localStorage.getItem("npg-token") ||
      sessionStorage.getItem("npg-token")
    );
  };

  // Fetch logged-in user's orders
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = getToken();

      if (!token) {
        toast.error("Please login to view your orders.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/order/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Fetch orders error:", error);
      toast.error(error.message || "Unable to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <main className="min-h-screen bg-[#100704] px-5 pb-20 pt-32 text-white md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#e59a38]">
            NPG Store
          </p>

          <h1 className="text-4xl font-black uppercase md:text-6xl">
            My Orders
          </h1>

          <p className="mt-3 text-sm text-white/40">
            View your orders and track your purchases.
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center">
            <Loader2
              size={40}
              className="animate-spin text-[#e59a38]"
            />

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Loading Orders...
            </p>
          </div>
        ) : orders.length === 0 ? (

          /* EMPTY STATE */
          <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">

            <div className="mb-7 grid h-24 w-24 place-items-center rounded-full border border-white/10 bg-[#1a0b07]">
              <Package
                size={32}
                className="text-[#e59a38]"
              />
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#e59a38]">
              NPG Store
            </p>

            <h2 className="mt-3 text-3xl font-black uppercase">
              No Orders Yet
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/40">
              You haven't placed any orders yet. Explore
              our collection and find something you love.
            </p>

            <Link
              to="/shop"
              className="mt-8 flex items-center gap-3 bg-[#e59a38] px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-black transition hover:bg-white"
            >
              <ArrowLeft size={15} />
              Shop NPG
            </Link>
          </div>

        ) : (

          /* ORDERS */
          <div className="space-y-8">

            {orders.map((order) => (

              <div
                key={order._id}
                className="overflow-hidden border border-white/10 bg-[#140806]"
              >

                {/* ORDER TOP */}
                <div className="flex flex-col gap-5 border-b border-white/10 p-5 md:flex-row md:items-center md:justify-between md:p-7">

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                      Order Number
                    </p>

                    <h2 className="mt-2 text-sm font-black uppercase">
                      #{order._id}
                    </h2>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                      Order Date
                    </p>

                    <p className="mt-2 text-xs text-white/70">
                      {order.date
                        ? new Date(order.date).toLocaleDateString(
                            "en-NG",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "N/A"}
                    </p>
                  </div>

                  {/* STATUS */}
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                      Order Status
                    </p>

                    <span className="mt-2 inline-block border border-[#e59a38]/30 bg-[#e59a38]/10 px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-[#e59a38]">
                      {order.status || "Processing"}
                    </span>
                  </div>

                </div>

                {/* ORDER CONTENT */}
                <div className="grid lg:grid-cols-[1fr_300px]">

                  {/* PRODUCTS */}
                  <div className="p-5 md:p-7">

                    <div className="mb-6 flex items-center gap-3">
                      <Package
                        size={17}
                        className="text-[#e59a38]"
                      />

                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">
                        Ordered Items
                      </h3>
                    </div>

                    <div className="space-y-5">

                      {order.items?.map((item, index) => {

                        const product = item.product;

                        return (
                          <div
                            key={item._id || index}
                            className="flex gap-4 border-b border-white/5 pb-5 last:border-0 last:pb-0"
                          >

                            {/* IMAGE */}
                            <div className="h-24 w-20 flex-shrink-0 overflow-hidden bg-[#1a0b07]">

                              {product?.image?.[0] ? (
                                <img
                                  src={product.image[0]}
                                  alt={
                                    product.name ||
                                    "Product"
                                  }
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-[9px] uppercase text-white/30">
                                  No Image
                                </div>
                              )}

                            </div>

                            {/* DETAILS */}
                            <div className="flex flex-1 flex-col justify-center">

                              <h4 className="text-sm font-black uppercase">
                                {product?.name ||
                                  "Unnamed Product"}
                              </h4>

                              <p className="mt-2 text-[10px] text-white/40">
                                Quantity:{" "}
                                {item.quantity || 1}
                              </p>

                              <p className="mt-2 text-xs font-bold text-[#e59a38]">
                                ₦
                                {Number(
                                  product?.price || 0
                                ).toLocaleString()}
                              </p>

                            </div>

                            {/* ITEM TOTAL */}
                            <div className="flex items-center">
                              <p className="text-sm font-bold">
                                ₦
                                {(
                                  Number(
                                    product?.price || 0
                                  ) *
                                  Number(
                                    item.quantity || 1
                                  )
                                ).toLocaleString()}
                              </p>
                            </div>

                          </div>
                        );
                      })}

                    </div>
                  </div>

                  {/* ORDER SUMMARY */}
                  <div className="border-t border-white/10 bg-[#110605] p-5 md:p-7 lg:border-l lg:border-t-0">

                    <div className="mb-6 flex items-center gap-3">
                      <CreditCard
                        size={17}
                        className="text-[#e59a38]"
                      />

                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">
                        Order Summary
                      </h3>
                    </div>

                    <div className="space-y-4">

                      {/* PAYMENT STATUS */}
                      <div className="flex justify-between">
                        <span className="text-[10px] uppercase tracking-wider text-white/40">
                          Payment
                        </span>

                        <span
                          className={`text-xs font-bold ${
                            order.paymentStatus === "Paid"
                              ? "text-green-400"
                              : "text-yellow-400"
                          }`}
                        >
                          {order.paymentStatus || "Pending"}
                        </span>
                      </div>

                      {/* METHOD */}
                      <div className="flex justify-between">
                        <span className="text-[10px] uppercase tracking-wider text-white/40">
                          Method
                        </span>

                        <span className="text-xs font-bold">
                          {order.method || "N/A"}
                        </span>
                      </div>

                      {/* TOTAL */}
                      <div className="flex justify-between border-t border-white/10 pt-4">
                        <span className="text-xs font-black uppercase">
                          Total
                        </span>

                        <span className="text-lg font-black text-[#e59a38]">
                          ₦
                          {Number(
                            order.amount || 0
                          ).toLocaleString()}
                        </span>
                      </div>

                    </div>
                  </div>

                </div>

                {/* DELIVERY ADDRESS */}
                <div className="border-t border-white/10 p-5 md:p-7">

                  <div className="flex gap-3">

                    <MapPin
                      size={18}
                      className="flex-shrink-0 text-[#e59a38]"
                    />

                    <div>

                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                        Delivery Address
                      </p>

                      <div className="mt-3 text-xs leading-6 text-white/50">

                        <p className="font-bold text-white">
                          {order.address?.fullName ||
                            "N/A"}
                        </p>

                        <p>
                          {order.address?.area ||
                            ""}
                        </p>

                        <p>
                          {order.address?.city || ""}
                          {order.address?.city &&
                          order.address?.state
                            ? ", "
                            : ""}
                          {order.address?.state || ""}
                        </p>

                        <p>
                          Pincode:{" "}
                          {order.address?.pincode ||
                            "N/A"}
                        </p>

                        <p>
                          {order.address?.phoneNumber ||
                            "N/A"}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
};

export default UserOrder;