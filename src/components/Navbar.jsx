import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  UserRound,
  ShoppingBag,
  ClipboardList,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";

import AOS from "aos";
import "aos/dist/aos.css";

export default function Navbar({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // ==============================
  // GET LOGGED-IN USER
  // ==============================
  useEffect(() => {
    const getUser = () => {
      try {
        // Try common localStorage keys
        const storedUser =
          localStorage.getItem("user") ||
          localStorage.getItem("userInfo") ||
          localStorage.getItem("currentUser");

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error reading user:", error);
        setUser(null);
      }
    };

    getUser();

    // Listen for login/logout changes
    window.addEventListener("storage", getUser);

    return () => {
      window.removeEventListener("storage", getUser);
    };
  }, []);

  // ==============================
  // AOS
  // ==============================
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 50,
    });
  }, []);

  // ==============================
  // NAV LINKS
  // ==============================
  const navLinks = [
    {
      name: "Shop",
      path: "/shop",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  // ==============================
  // LOGOUT
  // ==============================
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");

    setUser(null);
    setUserMenuOpen(false);
    setMenuOpen(false);

    navigate("/login");
  };

  // ==============================
  // GET USER NAME
  // ==============================
  const getUserName = () => {
    if (!user) return "";

    return (
      user.name ||
      user.username ||
      user.fullName ||
      user.firstName ||
      user.email?.split("@")[0] ||
      "User"
    );
  };

  // ==============================
  // GET FIRST LETTER
  // ==============================
  const getUserInitial = () => {
    const name = getUserName();

    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <>
      {/* =====================================================
          NAVBAR
      ====================================================== */}
      <header
        data-aos="fade-down"
        data-aos-duration="900"
        className="
          fixed
          left-0
          top-0
          z-50
          flex
          w-full
          items-center
          justify-between
          border-b
          border-white/10
          bg-[#160a06]/85
          px-5
          py-4
          backdrop-blur-xl
          md:px-10
          md:py-5
          lg:px-12
        "
      >
        {/* =====================================================
            LOGO
        ====================================================== */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="group flex items-center"
        >
          <img
            src="/NPG.jpeg"
            alt="NPG - Nothing Pass God"
            className="
              h-[55px]
              w-[100px]
              object-contain
              transition
              duration-300
              group-hover:scale-105
            "
          />
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}
        <nav
          className="
            hidden
            items-center
            gap-7
            text-[10px]
            font-bold
            uppercase
            tracking-[0.16em]
            md:flex
            lg:gap-9
          "
        >
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                relative
                py-2
                transition
                duration-300

                ${
                  isActive
                    ? "text-[#e59a38]"
                    : "text-white/80 hover:text-[#e59a38]"
                }

                after:absolute
                after:bottom-0
                after:left-0
                after:h-[1px]
                after:bg-[#e59a38]
                after:transition-all
                after:duration-300

                ${
                  isActive
                    ? "after:w-full"
                    : "after:w-0 hover:after:w-full"
                }
              `}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}
        <div
          className="
            flex
            items-center
            gap-1
            md:gap-2
          "
        >
          {/* =====================================================
              USER
          ====================================================== */}

          {user ? (
            // ================= LOGGED IN USER =================
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-label="User menu"
                className="
                  group
                  flex
                  items-center
                  gap-2
                  rounded-full
                  px-2
                  py-2
                  transition
                  hover:bg-[#e59a38]/10
                "
              >
                {/* USER AVATAR */}
                <span
                  className="
                    grid
                    h-9
                    w-9
                    place-items-center
                    rounded-full
                    bg-[#e59a38]
                    text-sm
                    font-black
                    text-black
                  "
                >
                  {getUserInitial()}
                </span>

                {/* USER NAME */}
                <span
                  className="
                    hidden
                    max-w-[100px]
                    truncate
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-white
                    md:block
                  "
                >
                  {getUserName()}
                </span>
              </button>

              {/* ================= USER DROPDOWN ================= */}
              {userMenuOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-14
                    w-52
                    overflow-hidden
                    rounded-xl
                    border
                    border-white/10
                    bg-[#160a06]
                    shadow-2xl
                  "
                >
                  {/* USER INFO */}
                  <div
                    className="
                      border-b
                      border-white/10
                      px-4
                      py-4
                    "
                  >
                    <p className="text-[9px] uppercase tracking-widest text-white/40">
                      Signed in as
                    </p>

                    <p className="mt-1 truncate text-sm font-bold text-white">
                      {getUserName()}
                    </p>

                    {user.email && (
                      <p className="mt-1 truncate text-[10px] text-white/40">
                        {user.email}
                      </p>
                    )}
                  </div>

                  {/* PROFILE */}
                  <Link
                    to="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-white/80
                      transition
                      hover:bg-[#e59a38]/10
                      hover:text-[#e59a38]
                    "
                  >
                    <User size={16} strokeWidth={1.5} />
                    Profile
                  </Link>

                  {/* ORDERS */}
                  <Link
                    to="/userorder"
                    onClick={() => setUserMenuOpen(false)}
                    className="
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-white/80
                      transition
                      hover:bg-[#e59a38]/10
                      hover:text-[#e59a38]
                    "
                  >
                    <ClipboardList size={16} strokeWidth={1.5} />
                    My Orders
                  </Link>

                  {/* LOGOUT */}
                  <button
                    onClick={handleLogout}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      border-t
                      border-white/10
                      px-4
                      py-3
                      text-left
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-red-400
                      transition
                      hover:bg-red-500/10
                    "
                  >
                    <LogOut size={16} strokeWidth={1.5} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // ================= NOT LOGGED IN =================
            <Link
              to="/login"
              aria-label="Login"
              className="
                group
                flex
                items-center
                gap-2
                rounded-full
                px-2
                py-2
                transition
                hover:bg-[#e59a38]/10
              "
            >
              <UserRound
                size={21}
                strokeWidth={1.5}
                className="
                  transition
                  duration-300
                  group-hover:text-[#e59a38]
                "
              />

              <span
                className="
                  hidden
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-widest
                  text-white/70
                  md:block
                "
              >
                Login
              </span>
            </Link>
          )}

          {/* =====================================================
              ORDERS ICON
          ====================================================== */}
          {user && (
            <Link
              to="/userorder"
              aria-label="My orders"
              className="
                group
                grid
                h-10
                w-10
                place-items-center
                rounded-full
                transition
                hover:bg-[#e59a38]/10
              "
            >
              <ClipboardList
                size={20}
                strokeWidth={1.5}
                className="
                  transition
                  duration-300
                  group-hover:text-[#e59a38]
                "
              />
            </Link>
          )}

          {/* =====================================================
              CART
          ====================================================== */}
          <Link
            to="/cart"
            aria-label="Shopping bag"
            className="
              group
              relative
              grid
              h-10
              w-10
              place-items-center
              rounded-full
              transition
              hover:bg-[#e59a38]/10
            "
          >
            <ShoppingBag
              size={20}
              strokeWidth={1.5}
              className="
                transition
                duration-300
                group-hover:text-[#e59a38]
              "
            />

            {/* CART NUMBER */}
            {cartCount > 0 && (
              <span
                className="
                  absolute
                  right-0
                  top-0
                  grid
                  h-4
                  w-4
                  place-items-center
                  rounded-full
                  bg-[#e59a38]
                  text-[8px]
                  font-black
                  text-black
                "
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* =====================================================
              MOBILE MENU BUTTON
          ====================================================== */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              grid
              h-10
              w-10
              place-items-center
              rounded-full
              border
              border-white/10
              transition
              hover:border-[#e59a38]
              hover:text-[#e59a38]
              md:hidden
            "
          >
            {menuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </header>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}
      <div
        className={`
          fixed
          inset-0
          z-40
          bg-[#100704]
          transition-all
          duration-500
          md:hidden

          ${
            menuOpen
              ? "visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          }
        `}
      >
        <div
          className="
            flex
            h-full
            flex-col
            px-6
            pb-8
            pt-32
          "
        >
          {/* MOBILE BRAND */}
          <div
            className="
              mb-8
              border-b
              border-white/10
              pb-7
            "
          >
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#e59a38]
              "
            >
              NPG Clothing
            </p>

            <h2
              className="
                mt-2
                text-4xl
                font-black
                uppercase
                leading-none
                tracking-[-0.05em]
              "
            >
              Own The
              <br />
              <span className="text-[#e59a38]">
                Street.
              </span>
            </h2>
          </div>

          {/* MOBILE LINKS */}
          <nav className="flex flex-col">
            {navLinks.map((item, index) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => `
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  py-4
                  text-xl
                  font-black
                  uppercase
                  tracking-tight
                  transition

                  ${
                    isActive
                      ? "text-[#e59a38]"
                      : "text-white hover:text-[#e59a38]"
                  }
                `}
              >
                <span>{item.name}</span>

                <span
                  className="
                    text-[9px]
                    font-bold
                    tracking-widest
                    text-white/25
                  "
                >
                  0{index + 1}
                </span>
              </NavLink>
            ))}

            {/* MOBILE ORDERS */}
            {user && (
              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  py-4
                  text-xl
                  font-black
                  uppercase
                  tracking-tight
                  text-white
                  transition
                  hover:text-[#e59a38]
                "
              >
                <span className="flex items-center gap-3">
                  <ClipboardList size={20} />
                  Orders
                </span>

                <span className="text-[9px] tracking-widest text-white/25">
                  04
                </span>
              </Link>
            )}
          </nav>

          {/* MOBILE USER SECTION */}
          <div className="mt-6">
            {user ? (
              <>
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    border-b
                    border-white/10
                    pb-5
                  "
                >
                  <span
                    className="
                      grid
                      h-11
                      w-11
                      place-items-center
                      rounded-full
                      bg-[#e59a38]
                      font-black
                      text-black
                    "
                  >
                    {getUserInitial()}
                  </span>

                  <div>
                    <p className="text-sm font-bold text-white">
                      {getUserName()}
                    </p>

                    {user.email && (
                      <p className="mt-1 text-[10px] text-white/40">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-white/10
                      px-4
                      py-3
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-widest
                      text-white
                    "
                  >
                    <User size={15} />
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-red-500/20
                      px-4
                      py-3
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-widest
                      text-red-400
                    "
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-lg
                  bg-[#e59a38]
                  px-5
                  py-4
                  text-[10px]
                  font-black
                  uppercase
                  tracking-widest
                  text-black
                "
              >
                <UserRound size={17} />
                Login / Register
              </Link>
            )}
          </div>

          {/* MOBILE SOCIAL */}
          <div
            className="
              mt-auto
              border-t
              border-white/10
              pt-6
            "
          >
            <div className="flex gap-3">
              <a
                href="#"
                className="
                  grid
                  h-10
                  w-10
                  place-items-center
                  rounded-full
                  border
                  border-white/10
                  text-[9px]
                  font-bold
                  transition
                  hover:border-[#e59a38]
                  hover:text-[#e59a38]
                "
              >
                IG
              </a>

              <a
                href="#"
                className="
                  grid
                  h-10
                  w-10
                  place-items-center
                  rounded-full
                  border
                  border-white/10
                  text-[9px]
                  font-bold
                  transition
                  hover:border-[#e59a38]
                  hover:text-[#e59a38]
                "
              >
                X
              </a>

              <a
                href="#"
                className="
                  grid
                  h-10
                  w-10
                  place-items-center
                  rounded-full
                  border
                  border-white/10
                  text-[9px]
                  font-bold
                  transition
                  hover:border-[#e59a38]
                  hover:text-[#e59a38]
                "
              >
                TK
              </a>
            </div>

            <p
              className="
                mt-5
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-white/30
              "
            >
              NPG — Nothing Pass God
            </p>
          </div>
        </div>
      </div>
    </>
  );
}