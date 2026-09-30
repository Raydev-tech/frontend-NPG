import { useState } from "react";
import {
  ArrowRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShoppingBag,
} from "lucide-react";
import { FaInstagram, FaTwitter } from "react-icons/fa";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@npgstreetwear.com",
    link: "mailto:hello@npgstreetwear.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+234 800 000 0000",
    link: "tel:+2348000000000",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Nigeria",
    link: "#",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-[#100704] pt-24 text-white">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden border-b border-white/10">

        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#e59a38]/10 blur-[140px]" />

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

          <div
            data-aos="fade-up"
            className="max-w-4xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-12 bg-[#e59a38]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#e59a38]">
                Get In Touch
              </span>
            </div>

            <h1 className="text-5xl font-black uppercase leading-[0.9] sm:text-6xl md:text-8xl">
              Let's
              <span className="block text-[#e59a38]">
                Talk.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              Have a question about an order, a product, or NPG?
              Send us a message and our team will get back to you.
            </p>
          </div>

        </div>
      </section>


      {/* =====================================================
          CONTACT AREA
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">

          {/* =================================================
              LEFT SIDE
          ================================================= */}
          <div data-aos="fade-right">

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#e59a38]">
              Contact NPG
            </p>

            <h2 className="text-3xl font-black uppercase sm:text-4xl">
              We're Here
              <span className="block text-white/40">
                To Help.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/45">
              Whether you need help with your order, want to know more
              about a product, or simply want to connect with NPG,
              we'd love to hear from you.
            </p>

            {/* Contact information */}
            <div className="mt-10 space-y-4">

              {contactInfo.map((item, index) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.title}
                    href={item.link}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="group flex items-center gap-5 border border-white/10 bg-[#160a06] p-5 transition duration-300 hover:border-[#e59a38]/50"
                  >

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10 transition group-hover:border-[#e59a38] group-hover:bg-[#e59a38] group-hover:text-black">
                      <Icon size={20} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#e59a38]">
                        {item.title}
                      </p>

                      <p className="mt-1 text-sm text-white/70">
                        {item.value}
                      </p>
                    </div>

                  </a>
                );
              })}

            </div>


            {/* Social */}
            <div className="mt-10">

              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                Follow NPG
              </p>

              <div className="flex gap-3">

                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center border border-white/10 transition hover:border-[#e59a38] hover:bg-[#e59a38] hover:text-black"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>

                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center border border-white/10 transition hover:border-[#e59a38] hover:bg-[#e59a38] hover:text-black"
                  aria-label="Twitter"
                >
                  <FaTwitter size={18} />
                </a>

                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center border border-white/10 transition hover:border-[#e59a38] hover:bg-[#e59a38] hover:text-black"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>

              </div>
            </div>

          </div>


          {/* =================================================
              CONTACT FORM
          ================================================= */}
          <div
            data-aos="fade-left"
            className="border border-white/10 bg-[#160a06] p-6 sm:p-8 lg:p-10"
          >

            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e59a38]">
                  Send A Message
                </p>

                <h3 className="mt-2 text-2xl font-bold uppercase">
                  Contact Us
                </h3>
              </div>

              <Send
                size={25}
                className="text-[#e59a38]"
              />
            </div>


            {submitted && (
              <div
                data-aos="fade-down"
                className="mb-6 border border-[#e59a38]/40 bg-[#e59a38]/10 p-4"
              >
                <p className="text-sm font-semibold text-[#e59a38]">
                  Message sent successfully.
                </p>

                <p className="mt-1 text-xs text-white/50">
                  Thank you for contacting NPG. We'll get back to you soon.
                </p>
              </div>
            )}


            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Name + Email */}
              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                    Your Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full border border-white/10 bg-[#100704] px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#e59a38]"
                  />
                </div>


                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full border border-white/10 bg-[#100704] px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#e59a38]"
                  />
                </div>

              </div>


              {/* Subject */}
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                  Subject
                </label>

                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border border-white/10 bg-[#100704] px-4 py-4 text-sm text-white outline-none transition focus:border-[#e59a38]"
                >
                  <option value="" className="bg-[#100704]">
                    Select a subject
                  </option>

                  <option value="Order" className="bg-[#100704]">
                    Order Support
                  </option>

                  <option value="Product" className="bg-[#100704]">
                    Product Question
                  </option>

                  <option value="Collaboration" className="bg-[#100704]">
                    Collaboration
                  </option>

                  <option value="General" className="bg-[#100704]">
                    General Question
                  </option>
                </select>
              </div>


              {/* Message */}
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what's on your mind..."
                  rows="7"
                  required
                  className="w-full resize-none border border-white/10 bg-[#100704] px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#e59a38]"
                />
              </div>


              {/* Submit */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 bg-[#e59a38] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-[#f3b64c]"
              >
                Send Message

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

            </form>

          </div>

        </div>

      </section>


      {/* =====================================================
          FAQ / SUPPORT BANNER
      ===================================================== */}
      <section className="border-y border-white/10 bg-[#160a06]">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div
            data-aos="fade-up"
            className="grid gap-10 md:grid-cols-2 md:items-center"
          >

            <div>
              <div className="mb-4 flex items-center gap-3">
                <ShoppingBag
                  size={20}
                  className="text-[#e59a38]"
                />

                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#e59a38]">
                  Need Help?
                </span>
              </div>

              <h2 className="text-3xl font-black uppercase sm:text-4xl">
                Questions About
                <span className="block text-white/40">
                  Your Order?
                </span>
              </h2>
            </div>

            <div>
              <p className="text-sm leading-7 text-white/45">
                We're committed to making your NPG experience smooth
                from checkout to delivery. Reach out if you need help
                with an order, sizing, shipping or anything else.
              </p>

              <a
                href="mailto:hello@npgstreetwear.com"
                className="group mt-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#e59a38]"
              >
                Email Our Team

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="relative overflow-hidden">

        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8 lg:py-32">

          <div data-aos="fade-up">

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#e59a38]">
              NPG / Community
            </p>

            <h2 className="text-4xl font-black uppercase leading-tight sm:text-6xl">
              Own Your
              <span className="text-[#e59a38]">
                {" "}Street.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/40">
              Stay connected with NPG and be the first to discover
              new drops, collections and announcements.
            </p>

            <a
              href="/new-arrivals"
              className="group mt-8 inline-flex items-center gap-4 border border-white/20 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] transition hover:border-[#e59a38] hover:bg-[#e59a38] hover:text-black"
            >
              Explore New Arrivals

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}