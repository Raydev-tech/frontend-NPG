import React from "react";
import { Package, MapPin, CreditCard, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const UserOrder = () => {
  // FRONTEND-ONLY ORDER DATA
  // Replace this with your backend data later
  const orders = [
    {
      _id: "NPG784521",
      date: "2026-09-20",
      amount: 50000,
      method: "Paystack",
      paymentStatus: "Paid",
      status: "Processing",

      items: [
        {
          quantity: 1,
          product: {
            name: "NPG Signature Tee",
            image: ["/cloth1.jpeg"],
            price: 18000,
          },
        },
        {
          quantity: 1,
          product: {
            name: "Oversized Hoodie",
            image: ["/hoddie2.jpeg"],
            price: 32000,
          },
        },
      ],

      address: {
        fullName: "Your Name",
        area: "Your Area",
        city: "Lagos",
        state: "Lagos",
        pincode: "100001",
        phoneNumber: "09159329752",
      },
    },
  ];

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

        {/* EMPTY STATE */}
        {orders.length === 0 ? (
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
                      {new Date(order.date).toLocaleDateString("en-NG")}
                    </p>
                  </div>

                  {/* STATUS */}
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                      Order Status
                    </p>

                    <span className="mt-2 inline-block border border-[#e59a38]/30 bg-[#e59a38]/10 px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-[#e59a38]">
                      {order.status}
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

                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex gap-4 border-b border-white/5 pb-5 last:border-0 last:pb-0"
                        >

                          {/* IMAGE */}
                          <div className="h-24 w-20 flex-shrink-0 overflow-hidden bg-[#1a0b07]">
                            {item.product?.image?.[0] ? (
                              <img
                                src={item.product.image[0]}
                                alt={
                                  item.product.name ||
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
                              {item.product?.name ||
                                "Unnamed Product"}
                            </h4>

                            <p className="mt-2 text-[10px] text-white/40">
                              Quantity: {item.quantity}
                            </p>

                            <p className="mt-2 text-xs font-bold text-[#e59a38]">
                              ₦
                              {Number(
                                item.product?.price || 0
                              ).toLocaleString()}
                            </p>
                          </div>

                          {/* ITEM TOTAL */}
                          <div className="flex items-center">
                            <p className="text-sm font-bold">
                              ₦
                              {(
                                Number(
                                  item.product?.price || 0
                                ) * Number(item.quantity || 1)
                              ).toLocaleString()}
                            </p>
                          </div>

                        </div>
                      ))}

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

                      <div className="flex justify-between">
                        <span className="text-[10px] uppercase tracking-wider text-white/40">
                          Payment
                        </span>

                        <span className="text-xs font-bold text-green-400">
                          {order.paymentStatus}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[10px] uppercase tracking-wider text-white/40">
                          Method
                        </span>

                        <span className="text-xs font-bold">
                          {order.method}
                        </span>
                      </div>

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
                          {order.address?.fullName}
                        </p>

                        <p>
                          {order.address?.area}
                        </p>

                        <p>
                          {order.address?.city},{" "}
                          {order.address?.state}
                        </p>

                        <p>
                          Pincode:{" "}
                          {order.address?.pincode}
                        </p>

                        <p>
                          {order.address?.phoneNumber}
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