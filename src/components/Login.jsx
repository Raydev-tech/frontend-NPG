import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  // ==========================================
  // PREVENT LOGGED-IN USER FROM OPENING LOGIN
  // ==========================================
  useEffect(() => {
    const storedUser =
      localStorage.getItem("npg-user") ||
      sessionStorage.getItem("npg-user");

    const storedToken =
      localStorage.getItem("npg-token") ||
      sessionStorage.getItem("npg-token");

    // If user is already logged in, send them home
    if (storedUser && storedToken) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // ================= API URL =================
  const url = "https://npg-store.vercel.app";

  // ================= STATES =================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Show / hide password
  const [showPassword, setShowPassword] = useState(false);

  // Loading
  const [loading, setLoading] = useState(false);

  // ================= LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    // Validate password
    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      toast.loading("Signing you in...", {
        id: "login",
      });

      // ================= API CALL =================
      const response = await fetch(`${url}/api/user/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password,
        }),
      });

      // Check HTTP response
      if (!response.ok) {
        let errorData = {};

        try {
          errorData = await response.json();
        } catch {
          errorData = {};
        }

        toast.dismiss("login");

        toast.error(
          errorData.message ||
            "Login failed. Please check your details.",
          {
            position: "top-center",
            duration: 3000,
          }
        );

        return;
      }

      // Get response
      const data = await response.json();

      console.log("Login response:", data);

      // Remove loading toast
      toast.dismiss("login");

      // ================= LOGIN SUCCESS =================
      if (data.success) {
        // Make sure token exists
        if (!data.token) {
          toast.error(
            "Login succeeded but no token was received.",
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
            "Login succeeded but user information was not received.",
            {
              position: "top-center",
              duration: 3000,
            }
          );

          return;
        }

        // ================= SAVE TOKEN =================
        if (rememberMe) {
          // Persistent login
          localStorage.setItem("npg-token", data.token);

          localStorage.setItem(
            "npg-user",
            JSON.stringify(data.user)
          );

          // Remove session copies
          sessionStorage.removeItem("npg-token");
          sessionStorage.removeItem("npg-user");
        } else {
          // Session login
          sessionStorage.setItem("npg-token", data.token);

          sessionStorage.setItem(
            "npg-user",
            JSON.stringify(data.user)
          );

          // Remove persistent copies
          localStorage.removeItem("npg-token");
          localStorage.removeItem("npg-user");
        }

        // Tell Navbar and other components
        // that authentication has changed
        window.dispatchEvent(
          new Event("npg-auth-change")
        );

        // Success message
        toast.success(
          data.message || "Welcome back to NPG!",
          {
            position: "top-center",
            duration: 2000,
          }
        );

        // Redirect home
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      } else {
        // ================= LOGIN FAILED =================
        toast.error(
          data.message || "Invalid email or password.",
          {
            position: "top-center",
            duration: 3000,
          }
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      toast.dismiss("login");

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
            LEFT SIDE
        ================================================= */}

        <div className="relative hidden w-1/2 overflow-hidden lg:block">

          {/* FASHION IMAGE */}
          <img
            src="/CEO.jpeg"
            alt="NPG Fashion"
            className="h-full w-full object-cover"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-[#100704]/65" />

          {/* GOLD GLOW */}
          <div className="absolute right-[-150px] top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#e59a38]/10 blur-[130px]" />

          {/* BRAND */}
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
                Streetwear made for those who move
                with confidence. Your style. Your
                statement.
              </p>
            </div>

            {/* COPYRIGHT */}
            <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/30">
              NPG © {new Date().getFullYear()}
            </p>
          </div>
        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="relative flex min-h-screen w-full items-center justify-center px-6 py-12 lg:w-1/2">

          {/* BACKGROUND GLOW */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/4 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#e59a38]/[0.05] blur-[120px]" />
          </div>

          <div className="relative z-10 w-full max-w-md">

            {/* =================================================
                MOBILE IMAGE
            ================================================= */}

            <div className="relative mb-10 h-52 w-full overflow-hidden lg:hidden">

              <img
                src="/login-image.jpg"
                alt="NPG Fashion"
                className="h-full w-full object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-[#100704]/45" />

              {/* MOBILE BRAND */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">

                <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.4em] text-[#e59a38]">
                  Nothing Pass God
                </p>

                <h1 className="text-5xl font-black tracking-[-0.08em]">
                  NPG
                </h1>

              </div>
            </div>

            {/* =================================================
                HEADING
            ================================================= */}

            <div className="mb-10">

              <p className="mb-4 text-[9px] font-black uppercase tracking-[0.35em] text-[#e59a38]">
                Welcome Back
              </p>

              <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.06em] sm:text-6xl">
                Sign
                <br />
                <span className="text-white/20">
                  In.
                </span>
              </h2>

              <p className="mt-5 max-w-sm text-xs leading-6 text-white/35">
                Sign in to your NPG account and
                continue your journey.
              </p>

            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="w-full"
            >

              {/* EMAIL */}
              <div className="mb-5">

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
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-white/20"
                    autoComplete="email"
                    required
                  />

                </div>
              </div>

              {/* PASSWORD */}
              <div className="mb-5">

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
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                    className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-white/20"
                    autoComplete="current-password"
                    required
                  />

                  {/* SHOW / HIDE PASSWORD */}
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

              {/* REMEMBER ME / FORGOT PASSWORD */}
              <div className="mb-8 flex items-center justify-between">

                <label className="flex cursor-pointer items-center gap-3">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 accent-[#e59a38]"
                  />

                  <span className="text-[9px] font-bold uppercase tracking-wider text-white/40">
                    Remember Me
                  </span>

                </label>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/forgot-password")
                  }
                  className="text-[9px] font-bold uppercase tracking-wider text-[#e59a38] transition hover:text-white"
                >
                  Forgot Password?
                </button>

              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className={`group flex h-14 w-full items-center justify-center gap-4 text-[9px] font-black uppercase tracking-[0.25em] text-black transition duration-300 ${
                  loading
                    ? "cursor-not-allowed bg-[#e59a38]/50"
                    : "bg-[#e59a38] hover:bg-white"
                }`}
              >
                {loading ? (
                  "Signing In..."
                ) : (
                  <>
                    Sign In

                    <ArrowLeft
                      size={15}
                      className="rotate-180 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              {/* CREATE ACCOUNT */}
              <p className="mt-7 text-center text-[10px] text-white/30">
                Don't have an account?

                <button
                  type="button"
                  onClick={() =>
                    navigate("/register")
                  }
                  className="ml-2 font-bold uppercase tracking-wider text-[#e59a38] transition hover:text-white"
                >
                  Create Account
                </button>
              </p>

            </form>

            {/* FOOTER */}
            <div className="mt-12 border-t border-white/10 pt-6 text-center">

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