import { useEffect, useState } from "react";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderPlaced = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Show success icon after 2 seconds
    const successTimer = setTimeout(() => {
      setShowSuccess(true);
    }, 2000);

    // Redirect to orders after 5 seconds
    const redirectTimer = setTimeout(() => {
      navigate("/userorder");
    }, 5000);

    return () => {
      clearTimeout(successTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <main className="min-h-screen bg-[#100704] text-white flex items-center justify-center px-6">

      <div className="w-full max-w-xl text-center">

        {/* LOGO / BRAND */}

        <div className="mb-10">
          <p className="text-[10px] font-black uppercase tracking-[0.45em] text-[#e59a38]">
            NPG
          </p>

          <p className="mt-2 text-[8px] uppercase tracking-[0.3em] text-white/30">
            Nothing Pass God
          </p>
        </div>

        {/* SUCCESS ICON */}

        <div className="relative mx-auto flex h-28 w-28 items-center justify-center">

          {!showSuccess ? (
            <>
              {/* Spinner */}

              <div className="h-24 w-24 animate-spin rounded-full border-4 border-white/10 border-t-[#e59a38]" />

              <ShoppingBag
                size={28}
                className="absolute text-[#e59a38]"
              />
            </>
          ) : (
            <div className="animate-[scaleIn_0.5s_ease-out]">

              <CheckCircle
                className="h-24 w-24 text-[#e59a38]"
                strokeWidth={1.5}
              />

            </div>
          )}

        </div>

        {/* MESSAGE */}

        <div className="mt-8">

          <p className="mb-3 text-[9px] font-black uppercase tracking-[0.4em] text-[#e59a38]">
            Order Confirmed
          </p>

          <h1 className="text-3xl font-black uppercase tracking-[-0.04em] sm:text-5xl">
            Order Placed
            <span className="block text-white/20">
              Successfully.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/40">
            Thank you for shopping with NPG. Your order has been
            successfully placed and is being processed.
          </p>

        </div>

        {/* PROGRESS */}

        <div className="mx-auto mt-10 max-w-sm">

          <div className="h-[2px] w-full overflow-hidden bg-white/10">
            <div
              className={`h-full bg-[#e59a38] transition-all duration-[5000ms] ease-linear ${
                showSuccess ? "w-full" : "w-2/5"
              }`}
            />
          </div>

          <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.25em] text-white/30">
            Redirecting to My Orders...
          </p>

        </div>

        {/* MANUAL BUTTON */}

        <button
          type="button"
          onClick={() => navigate("/userorder")}
          className="mx-auto mt-8 flex items-center justify-center gap-3 border border-white/10 px-7 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-white transition hover:border-[#e59a38] hover:bg-[#e59a38] hover:text-black"
        >
          View My Orders
          <ArrowRight size={15} />
        </button>

        {/* BOTTOM BRAND */}

        <p className="mt-12 text-[8px] uppercase tracking-[0.35em] text-white/20">
          NPG — Nothing Pass God
        </p>

      </div>

      {/* CUSTOM ANIMATION */}

      <style>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }

          70% {
            transform: scale(1.1);
            opacity: 1;
          }

          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

    </main>
  );
};

export default OrderPlaced;