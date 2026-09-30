import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaTiktok,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { FiArrowUpRight } from "react-icons/fi";

export default function Footer() {
  const shopLinks = [
    { name: "Shop All", href: "/shop" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Collections", href: "/collections" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#0b0402] text-white">

      {/* ================= TOP FOOTER ================= */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">

          {/* ================= BRAND ================= */}
          <div data-aos="fade-up">

            <a href="/" className="inline-block">
              <img
                src="/NPG.jpeg"
                alt="NPG"
                className="h-14 w-auto object-contain"
              />
            </a>

            <h2 className="mt-6 text-2xl font-black uppercase">
              Own The
              <span className="text-[#e59a38]"> Street.</span>
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/40">
              NPG is a streetwear brand built around individuality,
              confidence and culture. Wear your identity. Create your
              own path.
            </p>

            {/* Social Icons */}
            <div className="mt-7 flex gap-3">

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center border border-white/10 transition duration-300 hover:border-[#e59a38] hover:bg-[#e59a38] hover:text-black"
              >
                <FaInstagram size={17} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center border border-white/10 transition duration-300 hover:border-[#e59a38] hover:bg-[#e59a38] hover:text-black"
              >
                <FaTwitter size={17} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center border border-white/10 transition duration-300 hover:border-[#e59a38] hover:bg-[#e59a38] hover:text-black"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="#"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center border border-white/10 transition duration-300 hover:border-[#e59a38] hover:bg-[#e59a38] hover:text-black"
              >
                <FaTiktok size={16} />
              </a>

            </div>

          </div>


          {/* ================= SHOP ================= */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#e59a38]">
              Shop
            </h3>

            <ul className="mt-6 space-y-4">

              {shopLinks.map((link) => (
                <li key={link.name}>

                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
                  >
                    {link.name}

                    <FiArrowUpRight
                      size={13}
                      className="opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </a>

                </li>
              ))}

            </ul>
          </div>


          {/* ================= COMPANY ================= */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#e59a38]">
              Company
            </h3>

            <ul className="mt-6 space-y-4">

              {companyLinks.map((link) => (
                <li key={link.name}>

                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
                  >
                    {link.name}

                    <FiArrowUpRight
                      size={13}
                      className="opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </a>

                </li>
              ))}

            </ul>
          </div>


          {/* ================= CONTACT ================= */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#e59a38]">
              Contact
            </h3>

            <div className="mt-6 space-y-5">

              {/* Email */}
              <a
                href="mailto:hello@npgstreetwear.com"
                className="group flex items-start gap-4"
              >
                <FaEnvelope
                  size={16}
                  className="mt-1 shrink-0 text-[#e59a38]"
                />

                <span className="text-sm text-white/50 transition group-hover:text-white">
                  hello@npgstreetwear.com
                </span>
              </a>


              {/* Phone */}
              <a
                href="tel:+2348000000000"
                className="group flex items-start gap-4"
              >
                <FaPhoneAlt
                  size={15}
                  className="mt-1 shrink-0 text-[#e59a38]"
                />

                <span className="text-sm text-white/50 transition group-hover:text-white">
                  +234 800 000 0000
                </span>
              </a>


              {/* Location */}
              <div className="flex items-start gap-4">

                <FaMapMarkerAlt
                  size={16}
                  className="mt-1 shrink-0 text-[#e59a38]"
                />

                <span className="text-sm text-white/50">
                  Nigeria
                </span>

              </div>

            </div>
          </div>

        </div>

      </div>


      {/* ================= NEWSLETTER ================= */}
      <div className="border-y border-white/10 bg-[#160a06]">

        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

          <div
            data-aos="fade-up"
            className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center"
          >

            {/* Text */}
            <div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e59a38]">
                Stay Connected
              </p>

              <h3 className="mt-2 text-2xl font-black uppercase sm:text-3xl">
                Join The NPG Culture.
              </h3>

              <p className="mt-2 text-sm text-white/40">
                Get updates on new drops and collections.
              </p>

            </div>


            {/* Form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-md border border-white/10 bg-[#100704]"
            >

              <input
                type="email"
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent px-4 py-4 text-sm text-white outline-none placeholder:text-white/20"
              />

              <button
                type="submit"
                className="flex items-center gap-2 bg-[#e59a38] px-5 text-xs font-bold uppercase tracking-widest text-black transition hover:bg-[#f3b64c]"
              >
                Join

                <FiArrowUpRight size={15} />
              </button>

            </form>

          </div>

        </div>

      </div>


      {/* ================= BOTTOM ================= */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="flex flex-col gap-4 py-7 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} NPG. All rights reserved.
          </p>

          <div className="flex gap-6">

            <a
              href="#"
              className="transition hover:text-[#e59a38]"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition hover:text-[#e59a38]"
            >
              Terms & Conditions
            </a>

          </div>

          <p className="uppercase tracking-[0.2em]">
            Nothing Pass God
          </p>

        </div>

      </div>

    </footer>
  );
}