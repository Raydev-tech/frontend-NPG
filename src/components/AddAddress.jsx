import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { MapPin, ArrowLeft, Loader2 } from "lucide-react";

const API_URL = "https://npg-store.vercel.app";

const AddAddress = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    fullName: "",
    phoneNumber: "",
    pincode: "",
    area: "",
    city: "",
    state: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (loading) return;

    const token =
      localStorage.getItem("npg-token") ||
      sessionStorage.getItem("npg-token") ||
      localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in before saving your address.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/address/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to save your address."
        );
      }

      // Save the addresses returned by the backend.
      if (Array.isArray(result.addresses)) {
        localStorage.setItem(
          "npg-addresses",
          JSON.stringify(result.addresses)
        );
      } else {
        // Fallback if the backend doesn't return the address list.
        const saved = JSON.parse(
          localStorage.getItem("npg-addresses") || "[]"
        );

        localStorage.setItem(
          "npg-addresses",
          JSON.stringify([
            {
              ...data,
              _id: `address-${Date.now()}`,
            },
            ...saved,
          ])
        );
      }

      toast.success("Delivery address saved successfully!");

      navigate("/cart");
    } catch (error) {
      console.error("Add address error:", error);

      toast.error(
        error.message || "Unable to save address. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-md border border-white/10 bg-[#1a0b07] px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-[#e59a38]";

  const labelClass = "mb-2 block text-sm text-gray-300";

  return (
    <div className="min-h-screen bg-[#100704] px-5 py-12 text-white sm:px-8 md:px-16 md:py-20 lg:px-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm uppercase tracking-[3px] text-[#e59a38]">
            NPG Clothing
          </p>

          <h1 className="text-3xl font-semibold md:text-4xl">
            Shipping{" "}
            <span className="text-[#e59a38]">Address</span>
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Enter your delivery details to continue with your order.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Address Form */}
          <form onSubmit={onSubmitHandler}>
            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className={labelClass}>
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={data.fullName}
                  onChange={onChangeHandler}
                  autoComplete="name"
                  required
                  className={inputClass}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className={labelClass}>
                  Phone Number
                </label>

                <input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  value={data.phoneNumber}
                  onChange={onChangeHandler}
                  autoComplete="tel"
                  required
                  className={inputClass}
                />
              </div>

              {/* Street Address */}
              <div>
                <label htmlFor="area" className={labelClass}>
                  Address
                </label>

                <textarea
                  id="area"
                  name="area"
                  rows={4}
                  placeholder="House number, street, area..."
                  value={data.area}
                  onChange={onChangeHandler}
                  autoComplete="street-address"
                  required
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* City and State */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="city" className={labelClass}>
                    City
                  </label>

                  <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="City"
                    value={data.city}
                    onChange={onChangeHandler}
                    autoComplete="address-level2"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="state" className={labelClass}>
                    State
                  </label>

                  <input
                    id="state"
                    type="text"
                    name="state"
                    placeholder="State"
                    value={data.state}
                    onChange={onChangeHandler}
                    autoComplete="address-level1"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Postal Code */}
              <div>
                <label htmlFor="pincode" className={labelClass}>
                  Postal Code
                </label>

                <input
                  id="pincode"
                  type="text"
                  name="pincode"
                  placeholder="Postal code"
                  value={data.pincode}
                  onChange={onChangeHandler}
                  autoComplete="postal-code"
                  required
                  className={inputClass}
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 pt-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-white/20 px-8 py-3 text-gray-300 transition hover:border-[#e59a38] hover:text-[#e59a38] disabled:opacity-50 sm:w-auto"
                >
                  <ArrowLeft size={16} />
                  Back to Cart
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-[#e59a38] px-8 py-3 font-medium uppercase tracking-wide text-black transition hover:bg-[#f0aa4d] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Saving Address...
                    </>
                  ) : (
                    "Save Address"
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Right Side */}
          <div className="hidden min-h-[520px] items-center justify-center rounded-lg border border-white/10 bg-[#1a0b07] p-10 lg:flex">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#e59a38]">
                <MapPin size={36} className="text-[#e59a38]" />
              </div>

              <h2 className="mb-3 text-2xl font-semibold">
                Where should we deliver?
              </h2>

              <p className="mx-auto max-w-sm leading-7 text-gray-400">
                Add your delivery address so we can get your NPG
                order to you safely and conveniently.
              </p>

              <div className="mt-8 text-sm uppercase tracking-[3px] text-[#e59a38]">
                Nothing Pass God
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;