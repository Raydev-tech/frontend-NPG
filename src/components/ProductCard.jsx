import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";

const ProductCard = ({
  product,
  liked = [],
  toggleLike,
  addToCart,
}) => {
  const navigate = useNavigate();

  const productId = product.id || product._id;

  // ================================
  // OPEN PRODUCT
  // ================================
  const handleProductClick = () => {
    navigate(`/product/${productId}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ================================
  // LIKE PRODUCT
  // ================================
  const handleLike = (e) => {
    e.stopPropagation();

    if (toggleLike) {
      toggleLike(productId);
    }
  };

  // ================================
  // ADD TO CART
  // ================================
  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (addToCart) {
      addToCart(product);
    }
  };

  const image = Array.isArray(product.image)
    ? product.image[0]
    : product.image;

  return (
    <article
      onClick={handleProductClick}
      className="group w-full cursor-pointer"
    >
      {/* ================================
          PRODUCT IMAGE
      ================================= */}

      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#1a0b07]">
        <img
          src={image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
        />

        {/* OVERLAY */}

        <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/20" />

        {/* TAG */}

        {product.tag && (
          <span
            className={`absolute left-3 top-3 px-3 py-2 text-[7px] font-black uppercase tracking-[0.15em] ${
              product.tag === "Sale"
                ? "bg-[#e59a38] text-black"
                : "bg-[#100704] text-white"
            }`}
          >
            {product.tag}
          </span>
        )}

        {/* LIKE BUTTON */}

        <button
          type="button"
          onClick={handleLike}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md transition duration-300 hover:bg-white hover:text-black"
        >
          <Heart
            size={15}
            fill={
              liked.includes(productId)
                ? "currentColor"
                : "none"
            }
          />
        </button>

        {/* ADD TO BAG */}

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product.inStock === false}
          className="absolute bottom-3 left-3 right-3 flex translate-y-3 items-center justify-center gap-3 bg-[#e59a38] py-3.5 text-[8px] font-black uppercase tracking-[0.2em] text-black opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ShoppingBag size={14} />

          {product.inStock === false
            ? "Out Of Stock"
            : "Add To Bag"}
        </button>
      </div>

      {/* ================================
          PRODUCT INFORMATION
      ================================= */}

      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          {/* NAME */}

          <div className="min-w-0">
            <p className="mb-1 text-[7px] font-bold uppercase tracking-[0.2em] text-[#e59a38]">
              {product.category}
            </p>

            <h3 className="truncate text-[11px] font-black uppercase leading-5 tracking-tight transition duration-300 group-hover:text-[#e59a38] sm:text-xs">
              {product.name}
            </h3>
          </div>

          {/* PRICE */}

          <div className="shrink-0 text-right">
            <p className="text-[11px] font-bold text-white sm:text-xs">
              ₦{Number(product.price).toLocaleString()}
            </p>

            {product.oldPrice && (
              <p className="mt-1 text-[8px] text-white/25 line-through">
                ₦{Number(product.oldPrice).toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {/* COLOR DOTS */}

        <div className="mt-3 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-white/30 bg-black" />

          <span className="h-2.5 w-2.5 rounded-full bg-white" />

          <span className="h-2.5 w-2.5 rounded-full bg-[#e59a38]" />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;