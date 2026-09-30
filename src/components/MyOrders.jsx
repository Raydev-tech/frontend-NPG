import React from "react";
import { Package, MapPin, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const MyOrders = () => {
  // FRONTEND SAMPLE ORDERS
  const orders = [
    {
      id: "NPG784521",
      date: "20 September 2026",
      status: "Processing",
      payment: "Paid",
      method: "Paystack",
      total: 50000,

      items: [
        {
          name: "NPG Signature Tee",
          category: "T-Shirts",
          price: 18000,
          quantity: 1,
          image: "/cloth1.jpeg",
        },
        {
          name: "Oversized Hoodie",
          category: "Hoodies",
          price: 32000,
          quantity: 1,
          image: "/hoddie2.jpeg",
        },
      ],

      address: {
        name: "Your Name",
        area: "Your Area",
        city: "Lagos",
        state: "Lagos",
        phone: "09159329752",
      },
    },
  ];

  return (
    <main className="min-h-screen bg-[#100704] px-5 pb-20 pt-32 text-white md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#e59a38]">
            NPG Store
          </p>

          <h1 className="text-4xl font-black uppercase md:text-6xl">
            My Orders
          </h1>

          <p className="mt-3 text-sm text-white/40">
            View and track your NPG orders.
          </p>
        </div>

        {/* EMPTY ORDERS */}
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
              You haven't placed any orders yet.
              Explore our collection and find your
              next favorite piece.
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
                key={order.id}
                className="border border-white/10 bg-[#140806]"
              >

                {/* ORDER HEADER */}
                <div className="flex flex-col justify-between gap-5 border-b border-white/10 p-5 md:flex-row md:items-center md:p-7">

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                      Order Number
                    </p>

                    <h2 className="mt-2 text-sm font-black uppercase">
                      #{order.id}
                    </h2>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                      Order Date
                    </p>

                    <p className="mt-2 text-xs text-white/70">
                      {order.date}
                    </p>
                  </div>

                  {/* STATUS */}
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                      Status
                    </p>

                    <span className="mt-2 inline-block border border-[#e59a38]/30 bg-[#e59a38]/10 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-[#e59a38]">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* PRODUCTS */}
                <div className="p-5 md:p-7">

                  <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    Items
                  </p>

                  <div className="space-y-5">

                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 border-b border-white/5 pb-5 last:border-0 last:pb-0"
                      >

                        {/* IMAGE */}
                        <div className="h-24 w-20 flex-shrink-0 overflow-hidden bg-[#1a0b07]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* PRODUCT */}
                        <div className="flex flex-1 flex-col justify-center">

                          <h3 className="text-sm font-black uppercase">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/30">
                            {item.category}
                          </p>

                          <p className="mt-3 text-xs text-white/40">
                            Quantity:{" "}
                            <span className="text-white">
                              {item.quantity}
                            </span>
                          </p>
                        </div>

                        {/* PRICE */}
                        <div className="flex items-center">
                          <p className="text-sm font-bold text-[#e59a38]">
                            ₦
                            {(
                              item.price * item.quantity
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}

                  </div>
                </div>

                {/* BOTTOM INFORMATION */}
                <div className="grid border-t border-white/10 md:grid-cols-2">

                  {/* DELIVERY */}
                  <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r md:p-7">

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
                            {order.address.name}
                          </p>

                          <p>
                            {order.address.area}
                          </p>

                          <p>
                            {order.address.city},{" "}
                            {order.address.state}
                          </p>

                          <p>
                            {order.address.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SUMMARY */}
                  <div className="p-5 md:p-7">

                    <div className="space-y-4">

                      <div className="flex justify-between">
                        <span className="text-[10px] uppercase tracking-wider text-white/40">
                          Payment
                        </span>

                        <span className="text-xs font-bold text-green-400">
                          {order.payment}
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
                          ₦{order.total.toLocaleString()}
                        </span>
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

export default MyOrders;