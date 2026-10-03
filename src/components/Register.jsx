import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  LockKeyhole,
  Mail,
  UserRound,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  // ==========================================
  // PREVENT LOGGED-IN USER FROM OPENING REGISTER
  // ==========================================
  useEffect(() => {
    const storedUser =
      localStorage.getItem("npg-user") ||
      sessionStorage.getItem("npg-user");

    const storedToken =
      localStorage.getItem("npg-token") ||
      sessionStorage.getItem("npg-token");

    // If user is already logged in,
    // don't allow them to register again
    if (storedUser && storedToken) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // ==========================================
  // BACKEND URL
  // ==========================================
  const url = "https://npg-store.vercel.app/";

  // ==========================================
  // FORM STATE
  // ==========================================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [agree, setAgree] = useState(false);

  // Show / hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // Loading state
  const [loading, setLoading] = useState(false);

  // ==========================================
  // HANDLE INPUT CHANGES
  // ==========================================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // HANDLE REGISTRATION
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check required fields
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Check password length
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    // Check terms
    if (!agree) {
      toast.error("Please agree to the terms.");
      return;
    }

    try {
      setLoading(true);

      toast.loading("Creating your account...", {
        id: "register",
      });

      // ==========================================
      // CALL BACKEND API
      // ==========================================
      const response = await fetch(`${url}api/user/register`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      // ==========================================
      // GET BACKEND RESPONSE
      // ==========================================
      let data;

      try {
        data = await response.json();
      } catch (error) {
        console.error("Invalid server response:", error);

        toast.dismiss("register");

        toast.error(
          "The server returned an invalid response.",
          {
            position: "top-center",
            duration: 3000,
          }
        );

        return;
      }

      console.log("Register response:", data);

      toast.dismiss("register");

      // ==========================================
      // REGISTRATION SUCCESS
      // ==========================================
      if (data.success) {
        // Make sure token exists
        if (!data.token) {
          toast.error(
            "Account created, but no login token was received.",
            {
              position: "top-center",
              duration: 3000,
            }
          );

          return;
        }

        // Make sure user exists
        if (!data.user) {
          toast.error(
            "Account created, but user information was not received.",
            {
              position: "top-center",
              duration: 3000,
            }
          );

          return;
        }

        // ==========================================
        // SAVE LOGIN INFORMATION
        // ==========================================
        localStorage.setItem(
          "npg-token",
          data.token
        );

        localStorage.setItem(
          "npg-user",
          JSON.stringify(data.user)
        );

        // Remove any old session copies
        sessionStorage.removeItem("npg-token");
        sessionStorage.removeItem("npg-user");

        // ==========================================
        // TELL NAVBAR AUTH HAS CHANGED
        // ==========================================
        window.dispatchEvent(
          new Event("npg-auth-change")
        );

        // ==========================================
        // SUCCESS MESSAGE
        // ==========================================
        toast.success(
          data.message ||
            "Account created successfully!",
          {
            position: "top-center",
            duration: 2000,
          }
        );

        // ==========================================
        // REDIRECT HOME
        // ==========================================
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      } else {
        // ==========================================
        // BACKEND ERROR
        // ==========================================
        toast.error(
          data.message || "Registration failed.",
          {
            position: "top-center",
            duration: 3000,
          }
        );
      }
    } catch (error) {
      console.error("Registration error:", error);

      toast.dismiss("register");

      toast.error(
        "Unable to connect to the server. Please try again.",
        {
          position: "top-center",
          duration: 3000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#100704] text-white">
      <div className="flex min-h-screen w-full">

        {/* =================================================
            LEFT IMAGE SIDE
        ================================================= */}

        <div className="relative hidden w-1/2 overflow-hidden lg:block">

          {/* FASHION IMAGE */}
          <img
            src="/CEO.jpeg"
            alt="NPG Fashion Collection"
            className="h-full w-full object-cover"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-[#100704]/65" />

          {/* GOLD GLOW */}
          <div className="absolute right-[-150px] top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#e59a38]/10 blur-[130px]" />

          <div className="absolute inset-0 flex flex-col justify-between p-12">

            {/* BACK HOME */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex w-fit items-center gap-3 text-[9px] font-black uppercase tracking-[0.25em] text-white/60 transition hover:text-[#e59a38]"
            >
              <ArrowLeft size={15} />
              Back Home
            </button>

            {/* BRAND TEXT */}
            <div>
              <p className="mb-5 text-[9px] font-bold uppercase tracking-[0.4em] text-[#e59a38]">
                Nothing Pass God
              </p>

              <h1 className="text-7xl font-black uppercase leading-[0.8] tracking-[-0.07em]">
                NPG
              </h1>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/45">
                Create your account and step into
                the world of NPG streetwear.
                Style with confidence. Move with
                purpose.
              </p>
            </div>

            {/* COPYRIGHT */}
            <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/30">
              NPG © {new Date().getFullYear()}
            </p>

          </div>
        </div>

        {/* =================================================
            RIGHT FORM SIDE
        ================================================= */}

        <div className="relative flex min-h-screen w-full items-center justify-center px-6 py-16 lg:w-1/2">

          {/* BACKGROUND GLOW */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/4 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#e59a38]/[0.05] blur-[120px]" />
          </div>

          <div className="relative z-10 w-full max-w-md">

            {/* =================================================
                MOBILE BRAND
            ================================================= */}

            <div className="mb-10 text-center lg:hidden">

              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-4xl font-black tracking-[-0.08em]"
              >
                NPG
              </button>

              <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.35em] text-[#e59a38]">
                Nothing Pass God
              </p>

            </div>

            {/* =================================================
                HEADING
            ================================================= */}

            <div className="mb-8">

              <p className="mb-4 text-[9px] font-black uppercase tracking-[0.35em] text-[#e59a38]">
                Join NPG
              </p>

              <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.06em] sm:text-6xl">
                Create
                <br />
                <span className="text-white/20">
                  Account.
                </span>
              </h2>

              <p className="mt-5 max-w-sm text-xs leading-6 text-white/35">
                Create your NPG account and start
                your streetwear journey.
              </p>

            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="w-full"
            >

              {/* FULL NAME */}
              <div className="mb-4">

                <label
                  htmlFor="name"
                  className="mb-3 block text-[8px] font-black uppercase tracking-[0.25em] text-white/40"
                >
                  Full Name
                </label>

                <div className="flex h-14 items-center gap-3 border border-white/10 bg-[#160a06] px-5 transition focus-within:border-[#e59a38]/60">

                  <UserRound
                    size={16}
                    className="shrink-0 text-[#e59a38]"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-white/20"
                    autoComplete="name"
                    required
                  />

                </div>
              </div>

              {/* EMAIL */}
              <div className="mb-4">

                <label
                  htmlFor="email"
                  className="mb-3 block text-[8px] font-black uppercase tracking-[0.25em] text-white/40"
                >
                  Email Address
                </label>

                <div className="flex h-14 items-center gap-3 border border-white/10 bg-[#160a06] px-5 transition focus-within:border-[#e59a38]/60">

                  <Mail
                    size={16}
                    className="shrink-0 text-[#e59a38]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-white/20"
                    autoComplete="email"
                    required
                  />

                </div>
              </div>

              {/* PASSWORD */}
              <div className="mb-4">

                <label
                  htmlFor="password"
                  className="mb-3 block text-[8px] font-black uppercase tracking-[0.25em] text-white/40"
                >
                  Password
                </label>

                <div className="flex h-14 items-center gap-3 border border-white/10 bg-[#160a06] px-5 transition focus-within:border-[#e59a38]/60">

                  <LockKeyhole
                    size={16}
                    className="shrink-0 text-[#e59a38]"
                  />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-white/20"
                    autoComplete="new-password"
                    required
                  />

                  {/* SHOW PASSWORD */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="shrink-0 text-white/30 transition hover:text-[#e59a38]"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mb-5">

                <label
                  htmlFor="confirmPassword"
                  className="mb-3 block text-[8px] font-black uppercase tracking-[0.25em] text-white/40"
                >
                  Confirm Password
                </label>

                <div className="flex h-14 items-center gap-3 border border-white/10 bg-[#160a06] px-5 transition focus-within:border-[#e59a38]/60">

                  <LockKeyhole
                    size={16}
                    className="shrink-0 text-[#e59a38]"
                  />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-white/20"
                    autoComplete="new-password"
                    required
                  />

                  {/* SHOW CONFIRM PASSWORD */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="shrink-0 text-white/30 transition hover:text-[#e59a38]"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>
              </div>

              {/* TERMS */}
              <label className="mb-7 flex cursor-pointer items-start gap-3">

                <div className="relative mt-0.5">

                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) =>
                      setAgree(e.target.checked)
                    }
                    className="peer sr-only"
                  />

                  <div className="flex h-4 w-4 items-center justify-center border border-white/20 bg-[#160a06] transition peer-checked:border-[#e59a38] peer-checked:bg-[#e59a38]">

                    <Check
                      size={11}
                      className="text-black opacity-0 transition peer-checked:opacity-100"
                    />

                  </div>

                </div>

                <span className="text-[9px] leading-5 text-white/35">
                  I agree to the NPG terms and
                  conditions and understand the
                  privacy policy.
                </span>

              </label>

              {/* CREATE ACCOUNT */}
              <button
                type="submit"
                disabled={loading}
                className={`group flex h-14 w-full items-center justify-center gap-4 text-[9px] font-black uppercase tracking-[0.25em] text-black transition duration-300 ${
                  loading
                    ? "cursor-not-allowed bg-[#e59a38]/50"
                    : "bg-[#e59a38] hover:bg-white"
                }`}
              >

                {loading
                  ? "Creating Account..."
                  : "Create Account"}

                {!loading && (
                  <ArrowLeft
                    size={15}
                    className="rotate-180 transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}

              </button>

              {/* LOGIN */}
              <p className="mt-7 text-center text-[10px] text-white/30">

                Already have an account?

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="ml-2 cursor-pointer font-bold uppercase tracking-wider text-[#e59a38] transition hover:text-white"
                >
                  Sign In
                </button>

              </p>

            </form>

            {/* FOOTER */}
            <div className="mt-10 border-t border-white/10 pt-6 text-center">

              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/20">
                Nothing Pass God
              </p>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}