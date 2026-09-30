import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    // Save address temporarily in localStorage
    localStorage.setItem("npg-address", JSON.stringify(data));

    setTimeout(() => {
      toast.success("Shipping address saved!");

      setLoading(false);
      navigate("/cart");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#100704] text-white px-5 sm:px-8 md:px-16 lg:px-24 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[3px] text-[#e59a38] mb-2">
            NPG Clothing
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold">
            Shipping{" "}
            <span className="text-[#e59a38]">Address</span>
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Enter your delivery details to continue with your order.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Form */}
          <form onSubmit={onSubmitHandler}>
            <div className="space-y-5">

              {/* Full Name */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={data.fullName}
                  onChange={onChangeHandler}
                  required
                  className="w-full bg-[#1a0b07] border border-white/10 rounded-md px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#e59a38] transition"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  value={data.phoneNumber}
                  onChange={onChangeHandler}
                  required
                  className="w-full bg-[#1a0b07] border border-white/10 rounded-md px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#e59a38] transition"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Address
                </label>

                <textarea
                  name="area"
                  rows={4}
                  placeholder="House number, street, area..."
                  value={data.area}
                  onChange={onChangeHandler}
                  required
                  className="w-full bg-[#1a0b07] border border-white/10 rounded-md px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#e59a38] transition resize-none"
                />
              </div>

              {/* City + State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={data.city}
                    onChange={onChangeHandler}
                    required
                    className="w-full bg-[#1a0b07] border border-white/10 rounded-md px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#e59a38] transition"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={data.state}
                    onChange={onChangeHandler}
                    required
                    className="w-full bg-[#1a0b07] border border-white/10 rounded-md px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#e59a38] transition"
                  />
                </div>

              </div>

              {/* Postal Code */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Postal Code
                </label>

                <input
                  type="text"
                  name="pincode"
                  placeholder="Postal code"
                  value={data.pincode}
                  onChange={onChangeHandler}
                  required
                  className="w-full bg-[#1a0b07] border border-white/10 rounded-md px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#e59a38] transition"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  className="w-full sm:w-auto px-8 py-3 border border-white/20 text-gray-300 hover:border-[#e59a38] hover:text-[#e59a38] transition rounded-md"
                >
                  Back to Cart
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 bg-[#e59a38] text-black font-medium uppercase tracking-wide hover:bg-[#f0aa4d] transition rounded-md disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Address"}
                </button>

              </div>
            </div>
          </form>

          {/* Right Side */}
          <div className="hidden lg:flex min-h-[520px] bg-[#1a0b07] border border-white/10 rounded-lg items-center justify-center p-10">

            <div className="text-center">

              <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-[#e59a38] flex items-center justify-center">
                <span className="text-3xl text-[#e59a38]">
                  ⌖
                </span>
              </div>

              <h2 className="text-2xl font-semibold mb-3">
                Where should we deliver?
              </h2>

              <p className="text-gray-400 max-w-sm leading-7">
                Add your delivery address so we can get your NPG order
                to you safely and conveniently.
              </p>

              <div className="mt-8 text-[#e59a38] text-sm tracking-[3px] uppercase">
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