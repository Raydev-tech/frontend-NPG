import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";
import ProductCard from "../../components/ProductCard";
import products from "../../data/products";

const Product = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);
  const [liked, setLiked] = useState([]);

  // ================================
  // FIND PRODUCT
  // ================================

  useEffect(() => {
    const product = products.find(
      (item) =>
        item.id?.toString() === id ||
        item._id?.toString() === id
    );

    setProductData(product || null);

    if (product) {
      const image = Array.isArray(product.image)
        ? product.image[0]
        : product.image;

      setMainImage(image);
    }
  }, [id]);

  // ================================
  // LIKE PRODUCT
  // ================================

  const toggleLike = (productId) => {
    setLiked((current) =>
      current.includes(productId)
        ? current.filter((item) => item !== productId)
        : [...current, productId]
    );
  };

  // ================================
  // ADD TO CART
  // ================================

  const handleAddToCart = (product = productData) => {
    if (!product) return;

    if (!addToCart) {
      toast.error("Cart is not available.");
      return;
    }

    if (product.inStock === false) {
      toast.error("🚫 This product is out of stock!", {
        position: "top-center",
        duration: 2500,
      });

      return;
    }

    addToCart(product);
  };

  // ================================
  // BUY NOW
  // ================================

  const handleBuyNow = () => {
    if (!productData) return;

    // ================================
    // CHECK LOGIN
    // ================================

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("🔐 Please log in to continue.", {
        position: "top-center",
        duration: 2500,
      });

      // Redirect to login
      navigate("/login");

      return;
    }

    // ================================
    // CHECK STOCK
    // ================================

    if (productData.inStock === false) {
      toast.error("🚫 This product is out of stock!", {
        position: "top-center",
        duration: 2500,
      });

      return;
    }

    // ================================
    // CHECK CART FUNCTION
    // ================================

    if (!addToCart) {
      toast.error("Unable to add product to cart.", {
        position: "top-center",
        duration: 2500,
      });

      return;
    }

    // ================================
    // ADD PRODUCT TO CART
    // ================================

    const added = addToCart(productData);

    // ================================
    // GO TO CART
    // ================================

    if (added !== false) {
      navigate("/cart");
    }
  };

  // ================================
  // PRODUCT NOT FOUND
  // ================================

  if (!productData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#100704] px-6 text-white">
        <h1 className="text-4xl font-black uppercase">
          Product Not Found
        </h1>

        <p className="mt-3 text-sm text-white/40">
          The product you are looking for does not exist.
        </p>

        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="mt-8 flex items-center gap-3 bg-[#e59a38] px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-black transition hover:bg-white"
        >
          <ArrowLeft size={15} />
          Back To Shop
        </button>
      </div>
    );
  }

  // ================================
  // PRODUCT IMAGES
  // ================================

  const images = Array.isArray(productData.image)
    ? productData.image
    : [productData.image];

  const productId = productData._id || productData.id;

  // ================================
  // FEATURED PRODUCTS
  // ================================

  const featuredProducts = products
    .filter((product) => {
      const currentId =
        productData._id || productData.id;

      const otherId =
        product._id || product.id;

      return (
        otherId?.toString() !==
        currentId?.toString()
      );
    })
    .slice(0, 4);

  // ================================
  // PAGE
  // ================================

  return (
    <main className="min-h-screen bg-[#100704] text-white">

      {/* =================================================
          PRODUCT SECTION
      ================================================= */}

      <section className="px-6 pb-20 pt-32 md:px-12 lg:px-16">
        <div className="mx-auto max-w-[1500px]">

          {/* BACK TO SHOP */}

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="mb-8 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-white/40 transition hover:text-[#e59a38]"
          >
            <ArrowLeft size={15} />
            Back To Shop
          </button>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20">

            {/* =================================================
                IMAGES
            ================================================= */}

            <div data-aos="fade-right">

              {/* MAIN IMAGE */}

              <div className="relative aspect-[4/5] overflow-hidden bg-[#1a0b07]">

                <img
                  src={mainImage || images[0]}
                  alt={productData.name}
                  className="h-full w-full object-cover"
                />

                {/* PRODUCT TAG */}

                {productData.tag && (
                  <span
                    className={`absolute left-4 top-4 px-4 py-2 text-[8px] font-black uppercase tracking-[0.15em] ${
                      productData.tag === "Sale"
                        ? "bg-[#e59a38] text-black"
                        : "bg-[#100704] text-white"
                    }`}
                  >
                    {productData.tag}
                  </span>
                )}

              </div>

              {/* THUMBNAILS */}

              {images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">

                  {images.map((image, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        setMainImage(image)
                      }
                      className={`overflow-hidden border transition ${
                        mainImage === image
                          ? "border-[#e59a38]"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${productData.name}-${index}`}
                        className="aspect-square h-full w-full object-cover"
                      />
                    </button>
                  ))}

                </div>
              )}

            </div>

            {/* =================================================
                PRODUCT INFO
            ================================================= */}

            <div
              data-aos="fade-left"
              className="flex flex-col justify-center"
            >

              {/* CATEGORY */}

              <p className="mb-4 text-[9px] font-black uppercase tracking-[0.3em] text-[#e59a38]">
                {productData.category}
              </p>

              {/* NAME */}

              <h1 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-5xl md:text-6xl">
                {productData.name}
              </h1>

              {/* PRODUCT ID */}

              <div className="mt-5 border-y border-white/10 py-4">

                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/30">
                  Product ID
                </p>

                <p className="mt-1 break-all text-xs font-bold text-white/70">
                  {productId}
                </p>

              </div>

              {/* PRICE */}

              <div className="mt-6 flex items-center gap-3">

                <p className="text-3xl font-black">
                  ₦
                  {Number(
                    productData.price
                  ).toLocaleString()}
                </p>

                {productData.oldPrice && (
                  <p className="text-sm text-white/25 line-through">
                    ₦
                    {Number(
                      productData.oldPrice
                    ).toLocaleString()}
                  </p>
                )}

              </div>

              {/* RATING */}

              <div className="mt-5 flex items-center gap-2">

                <div className="flex items-center gap-1">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <Star
                        key={star}
                        size={15}
                        fill="currentColor"
                        className="text-[#e59a38]"
                      />
                    )
                  )}

                </div>

                <span className="text-xs text-white/40">
                  5.0
                </span>

              </div>

              {/* DESCRIPTION */}

              <div className="mt-8 border-t border-white/10 pt-7">

                <p className="mb-3 text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
                  Product Details
                </p>

                <p className="max-w-xl text-sm leading-7 text-white/50">
                  {productData.description}
                </p>

              </div>

              {/* STOCK */}

              <div className="mt-6 flex items-center gap-3">

                <span
                  className={`h-2 w-2 rounded-full ${
                    productData.inStock === false
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                />

                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50">
                  {productData.inStock === false
                    ? "Out Of Stock"
                    : "In Stock"}
                </p>

              </div>

              {/* =================================================
                  BUTTONS
              ================================================= */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                {/* ADD TO CART */}

                <button
                  type="button"
                  onClick={() =>
                    handleAddToCart()
                  }
                  disabled={
                    productData.inStock === false
                  }
                  className="flex flex-1 items-center justify-center gap-3 bg-[#e59a38] px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ShoppingBag size={16} />
                  Add To Cart
                </button>

                {/* BUY NOW */}

                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={
                    productData.inStock === false
                  }
                  className="flex flex-1 items-center justify-center gap-3 border border-white/20 px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-white transition hover:border-[#e59a38] hover:bg-[#e59a38] hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Buy Now
                </button>

              </div>

              {/* EXTRA INFO */}

              <div className="mt-8 grid grid-cols-2 gap-3">

                <div className="border border-white/10 p-4">

                  <p className="text-[8px] font-black uppercase tracking-widest text-white/30">
                    Quality
                  </p>

                  <p className="mt-2 text-xs font-bold">
                    Premium
                  </p>

                </div>

                <div className="border border-white/10 p-4">

                  <p className="text-[8px] font-black uppercase tracking-widest text-white/30">
                    Brand
                  </p>

                  <p className="mt-2 text-xs font-bold">
                    NPG
                  </p>

                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =================================================
          YOU MAY ALSO LIKE
      ================================================= */}

      <section className="border-t border-white/10 px-6 py-20 md:px-12 md:py-28 lg:px-16">

        <div className="mx-auto max-w-[1500px]">

          <div
            data-aos="fade-up"
            className="mb-10"
          >

            <p className="mb-4 text-[9px] font-black uppercase tracking-[0.35em] text-[#e59a38]">
              You May Also Like
            </p>

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.05em] md:text-6xl">
                Featured
                <span className="text-white/20">
                  {" "}
                  Products.
                </span>
              </h2>

              <button
                type="button"
                onClick={() => navigate("/shop")}
                className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.2em] text-white/40 transition hover:text-[#e59a38]"
              >
                View All

                <ArrowLeft
                  size={14}
                  className="rotate-180"
                />
              </button>

            </div>

          </div>

          {/* FEATURED GRID */}

          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">

            {featuredProducts.map(
              (product, index) => (
                <div
                  key={product._id || product.id}
                  data-aos="fade-up"
                  data-aos-delay={
                    (index % 4) * 100
                  }
                >
                  <ProductCard
                    product={product}
                    liked={liked}
                    toggleLike={toggleLike}
                    addToCart={handleAddToCart}
                  />
                </div>
              )
            )}

          </div>

        </div>

      </section>

    </main>
  );
};

export default Product;