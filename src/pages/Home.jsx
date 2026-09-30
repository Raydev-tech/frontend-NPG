import {
  ArrowDown,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import Collections from "./Collections";
import BrandStory from "./BrandStory";
//import Shop from "./Shop";

export default function Home() {
  return (
    <main className="bg-[#100704] text-white">

      {/* ================= HERO ================= */}
      <section
        id="top"
        className="
          relative
          flex
          min-h-[720px]
          items-end
          overflow-hidden
          border-b
          border-white/10
          pt-24
          md:min-h-[800px]
        "
      >

        {/* ================= DARK OVERLAY ================= */}
        <div
          className="
            absolute
            inset-0
            z-10
            bg-[linear-gradient(90deg,#100704_0%,#100704_24%,rgba(16,7,4,.75)_48%,rgba(16,7,4,.15)_100%)]
          "
        />

        <div
          className="
            absolute
            inset-0
            z-10
            bg-[linear-gradient(0deg,rgba(0,0,0,.8),transparent_50%)]
          "
        />

        {/* ================= HERO IMAGE ================= */}
        <div
          data-aos="fade-left"
          data-aos-duration="1200"
          className="
            absolute
            right-0
            top-0
            h-full
            w-full
            md:w-[68%]
          "
        >
          <img
            src="/CEO.jpeg"
            alt="NPG streetwear"
            className="
              h-full
              w-full
              object-cover
              object-center
              grayscale-[20%]
            "
          />
        </div>

        {/* ================= HERO CONTENT ================= */}
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="
            relative
            z-20
            w-full
            px-6
            pb-14
            md:px-12
            md:pb-20
            lg:px-16
          "
        >

          {/* SMALL TEXT */}
          <p
            data-aos="fade-right"
            data-aos-delay="200"
            className="
              mb-4
              text-sm
              font-bold
              italic
              uppercase
              tracking-[0.12em]
              text-[#e59a38]
              md:text-lg
            "
          >
            Nothing Pass God
          </p>

          {/* MAIN TITLE */}
          <h1
            data-aos="fade-up"
            data-aos-delay="300"
            className="
              max-w-4xl
              text-[clamp(4rem,12vw,10rem)]
              font-black
              uppercase
              leading-[.76]
              tracking-[-0.08em]
            "
          >
            Own
            <br />

            The
            <br />

            Street
            <span className="text-[#e59a38]">
              .
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p
            data-aos="fade-up"
            data-aos-delay="450"
            className="
              mt-7
              max-w-[290px]
              text-sm
              leading-6
              text-white/75
              md:text-base
            "
          >
            Streetwear made for those
            who move different. Built
            with confidence, culture
            and attitude.
          </p>

          {/* BUTTONS */}
          <div
            data-aos="fade-up"
            data-aos-delay="550"
            className="
              mt-7
              flex
              flex-wrap
              items-center
              gap-3
            "
          >

            {/* SHOP BUTTON */}
            <a
              href="/shop"
              className="
                group
                flex
                items-center
                gap-8
                bg-[#e59a38]
                px-6
                py-4
                text-[10px]
                font-black
                uppercase
                tracking-widest
                text-black
                transition
                duration-300
                hover:bg-white
              "
            >
              Shop now

              <ArrowRight
                size={18}
                className="
                  transition
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </a>

            {/* COLLECTION BUTTON */}
            <a
              href="/collections"
              className="
                flex
                items-center
                gap-3
                border
                border-white/30
                px-6
                py-4
                text-[10px]
                font-black
                uppercase
                tracking-widest
                transition
                hover:border-[#e59a38]
                hover:text-[#e59a38]
              "
            >
              Collections

              <ShoppingBag size={16} />
            </a>

          </div>

          {/* SCROLL */}
          <div
            data-aos="fade-up"
            data-aos-delay="700"
            className="
              mt-8
              flex
              items-center
              gap-3
              text-[9px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-white/60
            "
          >
            <ArrowDown
              size={14}
              className="text-[#e59a38]"
            />

            Scroll to explore
          </div>

        </div>

        {/* ================= NPG WATERMARK ================= */}
        <div
          data-aos="fade"
          data-aos-delay="800"
          className="
            absolute
            bottom-5
            right-6
            z-20
            hidden
            select-none
            text-[7rem]
            font-black
            uppercase
            leading-none
            tracking-[-0.08em]
            text-white/[0.04]
            md:block
            lg:text-[10rem]
          "
        >
          NPG
        </div>

      </section>

      {/* ================= BRAND STRIP ================= */}
      <div
        data-aos="fade-up"
        className="
          grid
          grid-cols-2
          border-b
          border-white/10
          bg-[#160a06]
          md:grid-cols-4
        "
      >

        <div
          className="
            border-r
            border-white/10
            px-5
            py-5
            text-center
          "
        >
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#e59a38]">
            01
          </p>

          <p className="mt-1 text-[10px] font-bold uppercase tracking-widest">
            Streetwear
          </p>
        </div>

        <div
          className="
            border-r
            border-white/10
            px-5
            py-5
            text-center
          "
        >
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#e59a38]">
            02
          </p>

          <p className="mt-1 text-[10px] font-bold uppercase tracking-widest">
            Premium Quality
          </p>
        </div>

        <div
          className="
            border-r
            border-white/10
            px-5
            py-5
            text-center
          "
        >
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#e59a38]">
            03
          </p>

          <p className="mt-1 text-[10px] font-bold uppercase tracking-widest">
            Own The Street
          </p>
        </div>

        <div
          className="
            px-5
            py-5
            text-center
          "
        >
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#e59a38]">
            04
          </p>

          <p className="mt-1 text-[10px] font-bold uppercase tracking-widest">
            NPG Culture
          </p>
        </div>

      </div>

      <Collections />
      <BrandStory />
      {/* <Shop /> */}

    </main>
  );
}