import {
  ArrowRight,
  ArrowUpRight,
  Quote,
} from "lucide-react";

export default function BrandStory() {
  return (
    <section
      id="about"
      className="
        relative
        overflow-hidden
        bg-[#160a06]
        px-6
        py-24
        text-white
        md:px-12
        md:py-32
        lg:px-16
      "
    >
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0">
        <div className="
          absolute
          left-[-150px]
          top-[20%]
          h-[400px]
          w-[400px]
          rounded-full
          bg-[#e59a38]/[0.05]
          blur-[130px]
        " />

        <div className="
          absolute
          bottom-[-200px]
          right-[-100px]
          h-[450px]
          w-[450px]
          rounded-full
          bg-[#e59a38]/[0.04]
          blur-[130px]
        " />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px]">

        {/* ================= TOP LABEL ================= */}
        <div
          data-aos="fade-right"
          data-aos-duration="900"
          className="mb-12 flex items-center gap-4"
        >
          <span className="h-px w-10 bg-[#e59a38]" />

          <p className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.35em]
            text-[#e59a38]
          ">
            NPG / 002
          </p>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="
          grid
          gap-14
          lg:grid-cols-[1.1fr_0.9fr]
          lg:items-center
        ">

          {/* ================= LEFT ================= */}
          <div>

            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="
                mb-6
                text-xs
                font-bold
                uppercase
                tracking-[0.3em]
                text-white/40
              "
            >
              Nothing Pass God
            </p>

            <h2
              data-aos="fade-up"
              data-aos-delay="200"
              className="
                max-w-4xl
                text-5xl
                font-black
                uppercase
                leading-[0.82]
                tracking-[-0.07em]
                sm:text-6xl
                md:text-8xl
              "
            >
              More Than
              <br />

              <span className="text-white/25">
                Just Clothing.
              </span>
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="350"
              className="
                mt-8
                max-w-xl
                text-sm
                leading-7
                text-white/50
                md:text-base
              "
            >
              NPG is built around individuality, confidence
              and the culture of the streets. Every piece
              represents a mindset — move different,
              stay original and never lose yourself.
            </p>

            <a
              href="/about"
              data-aos="fade-up"
              data-aos-delay="450"
              className="
                group
                mt-8
                inline-flex
                items-center
                gap-5
                border-b
                border-white/20
                pb-3
                text-[9px]
                font-black
                uppercase
                tracking-[0.25em]
                transition
                hover:border-[#e59a38]
                hover:text-[#e59a38]
              "
            >
              Discover our story

              <ArrowRight
                size={16}
                className="
                  transition
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </a>

          </div>

          {/* ================= RIGHT ================= */}
          <div
            data-aos="fade-left"
            data-aos-duration="1100"
            className="relative"
          >

            {/* IMAGE */}
            <div className="
              relative
              aspect-[4/5]
              overflow-hidden
              bg-[#100704]
            ">

              <img
                src="/back.jpeg"
                alt="NPG streetwear culture"
                className="
                  h-full
                  w-full
                  object-cover
                  grayscale
                  transition
                  duration-[1200ms]
                  hover:scale-105
                  hover:grayscale-0
                "
              />

              {/* OVERLAY */}
              <div className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/80
                via-transparent
                to-black/10
              " />

              {/* NPG */}
              <div className="
                absolute
                bottom-6
                left-6
                text-6xl
                font-black
                uppercase
                leading-none
                tracking-[-0.08em]
                text-white/90
                md:text-8xl
              ">
                NPG
              </div>

              {/* CORNER ICON */}
              <div className="
                absolute
                right-5
                top-5
                grid
                h-11
                w-11
                place-items-center
                rounded-full
                border
                border-white/20
                bg-black/20
                backdrop-blur-md
              ">
                <ArrowUpRight size={18} />
              </div>

            </div>

            {/* FLOATING NUMBER */}
            <div className="
              absolute
              -bottom-5
              -left-5
              grid
              h-16
              w-16
              place-items-center
              border
              border-[#e59a38]/40
              bg-[#160a06]
              text-xs
              font-black
              text-[#e59a38]
              md:h-20
              md:w-20
            ">
              002
            </div>

          </div>

        </div>

        {/* ================= MANIFESTO ================= */}
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="
            relative
            mt-24
            border-y
            border-white/10
            py-14
            md:mt-32
            md:py-20
          "
        >

          <Quote
            data-aos="fade-down"
            data-aos-delay="200"
            size={30}
            className="mb-8 text-[#e59a38]"
          />

          <h3
            data-aos="fade-up"
            data-aos-delay="300"
            className="
              max-w-6xl
              text-3xl
              font-black
              uppercase
              leading-[0.95]
              tracking-[-0.05em]
              sm:text-4xl
              md:text-6xl
            "
          >
            “Don't follow the street.
            <br />

            <span className="text-[#e59a38]">
              Create your own.
            </span>
            ”
          </h3>

          <div
            data-aos="fade-up"
            data-aos-delay="450"
            className="
              mt-8
              flex
              items-center
              gap-3
              text-[8px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-white/30
            "
          >
            <span className="h-px w-8 bg-[#e59a38]" />
            NPG Philosophy
          </div>

        </div>

        {/* ================= VALUES ================= */}
        <div className="
          mt-16
          grid
          grid-cols-1
          border
          border-white/10
          sm:grid-cols-3
        ">

          {/* VALUE 01 */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="
              border-b
              border-white/10
              p-7
              sm:border-b-0
              sm:border-r
            "
          >
            <p className="text-[9px] font-black text-[#e59a38]">
              01
            </p>

            <h4 className="
              mt-5
              text-xl
              font-black
              uppercase
              tracking-[-0.03em]
            ">
              Individuality
            </h4>

            <p className="
              mt-3
              text-xs
              leading-6
              text-white/35
            ">
              Be yourself. Your style should
              never look like everyone else's.
            </p>
          </div>

          {/* VALUE 02 */}
          <div
            data-aos="fade-up"
            data-aos-delay="250"
            className="
              border-b
              border-white/10
              p-7
              sm:border-b-0
              sm:border-r
            "
          >
            <p className="text-[9px] font-black text-[#e59a38]">
              02
            </p>

            <h4 className="
              mt-5
              text-xl
              font-black
              uppercase
              tracking-[-0.03em]
            ">
              Confidence
            </h4>

            <p className="
              mt-3
              text-xs
              leading-6
              text-white/35
            ">
              Wear what represents you.
              Walk with confidence.
            </p>
          </div>

          {/* VALUE 03 */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="p-7"
          >
            <p className="text-[9px] font-black text-[#e59a38]">
              03
            </p>

            <h4 className="
              mt-5
              text-xl
              font-black
              uppercase
              tracking-[-0.03em]
            ">
              Culture
            </h4>

            <p className="
              mt-3
              text-xs
              leading-6
              text-white/35
            ">
              Inspired by the streets,
              driven by culture.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}