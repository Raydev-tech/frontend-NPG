import { useState } from "react";
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

const newArrivals = [
  {
    id: 1,
    name: "NPG Signature Tee",
    category: "T-Shirts",
    price: 28000,
    image: "/cloth2.jpeg",
    tag: "NEW",
  },
  {
    id: 2,
    name: "NPG Baggy Denim",
    category: "Denim",
    price: 45000,
    image: "/jean1.png",
    tag: "NEW",
  },
  {
    id: 3,
    name: "NPG Oversized Hoodie",
    category: "Hoodies",
    price: 52000,
    image: "/hoodie2.jpeg",
    tag: "HOT",
  },
  {
    id: 4,
    name: "NPG Street Tee",
    category: "T-Shirts",
    price: 30000,
    image: "/cloth1.jpeg",
    tag: "NEW",
  },
  {
    id: 5,
    name: "NPG Relaxed Jeans",
    category: "Denim",
    price: 48000,
    image: "/jean.jpeg",
    tag: "NEW",
  },
  {
    id: 6,
    name: "NPG Essential Hoodie",
    category: "Hoodies",
    price: 50000,
    image: "/hoddie1.jpeg",
    tag: "LIMITED",
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);

export default function NewArrivals() {
  const [wishlist, setWishlist] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-[#100704] text-white pt-24">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b border-white/10">
        {/* Background glow */}
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#e59a38]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

          <div
            data-aos="fade-up"
            className="mb-5 flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-[#e59a38]"
          >
            <Sparkles size={17} />
            Fresh Drop
          </div>

          <div className="grid items-end gap-10 lg:grid-cols-2">

            <div data-aos="fade-right">
              <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl">
                New
                <span className="block text-[#e59a38]">
                  Arrivals.
                </span>
              </h1>
            </div>

            <div data-aos="fade-left">
              <p className="max-w-xl text-base leading-7 text-white/60 sm:text-lg">
                Fresh pieces. New energy. Same NPG attitude.
                Discover the latest additions to the collection,
                designed for those who create their own lane.
              </p>

              <div className="mt-8 flex items-center gap-5">
                <div className="h-px w-16 bg-[#e59a38]" />
                <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Own The Street
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PRODUCT SECTION ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        {/* Header */}
        <div
          data-aos="fade-up"
          className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[#e59a38]">
              Latest Drop
            </p>

            <h2 className="text-3xl font-bold uppercase sm:text-4xl">
              Just In
            </h2>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/50">
            <span>{newArrivals.length}</span>
            <span>New Pieces</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">

          {newArrivals.map((product, index) => {
            const isLiked = wishlist.includes(product.id);

            return (
              <article
                key={product.id}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className="group"
              >

                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#1a0b06]">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/5 transition group-hover:bg-black/20" />

                  {/* Tag */}
                  <div className="absolute left-3 top-3">
                    <span className="bg-[#e59a38] px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black">
                      {product.tag}
                    </span>
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition hover:bg-[#e59a38] hover:text-black"
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      size={17}
                      className={isLiked ? "fill-current" : ""}
                    />
                  </button>

                  {/* Add to cart */}
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full p-3 transition duration-300 group-hover:translate-y-0">
                    <button
                      onClick={addToCart}
                      className="flex w-full items-center justify-center gap-2 bg-white py-3 text-xs font-bold uppercase tracking-widest text-black transition hover:bg-[#e59a38]"
                    >
                      <ShoppingBag size={16} />
                      Add to Bag
                    </button>
                  </div>
                </div>

                {/* Product info */}
                <div className="pt-4">
                  <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-white/40">
                    {product.category}
                  </p>

                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide sm:text-base">
                      {product.name}
                    </h3>

                    <p className="whitespace-nowrap text-sm font-bold text-[#e59a38]">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>

              </article>
            );
          })}

        </div>

        {/* View all */}
        <div
          data-aos="fade-up"
          className="mt-16 flex justify-center"
        >
          <a
            href="/shop"
            className="group inline-flex items-center gap-4 border border-white/20 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] transition hover:border-[#e59a38] hover:bg-[#e59a38] hover:text-black"
          >
            Shop All Products
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>

      </section>

      {/* ================= STATEMENT BANNER ================= */}
      <section
        data-aos="fade-up"
        className="border-y border-white/10 bg-[#160a06]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-8">

          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#e59a38]">
            NPG / 2026
          </p>

          <h2 className="mx-auto max-w-4xl text-3xl font-black uppercase leading-tight sm:text-5xl">
            New Season.
            <span className="text-[#e59a38]"> New Energy.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/50">
            Built for movement. Designed for confidence.
            Made for the ones who refuse to blend in.
          </p>

        </div>
      </section>

      {/* Cart count */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#e59a38] px-5 py-3 text-black shadow-2xl">
          <ShoppingBag size={18} />
          <span className="text-sm font-bold">
            {cartCount} {cartCount === 1 ? "item" : "items"}
          </span>
        </div>
      )}

    </main>
  );
}