import {
  ArrowRight,
  Award,
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const values = [
  {
    icon: Sparkles,
    number: "01",
    title: "Individuality",
    text: "We believe your style should speak before you do. NPG is built for people who create their own identity.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Quality",
    text: "Every piece is designed with attention to fit, comfort, detail and the everyday demands of streetwear.",
  },
  {
    icon: Users,
    number: "03",
    title: "Community",
    text: "NPG is more than clothing. It is a growing culture built around confidence, creativity and self-expression.",
  },
  {
    icon: Award,
    number: "04",
    title: "Confidence",
    text: "Wear what represents you. Move with confidence. Own your presence wherever you go.",
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-[#100704] text-white pt-24">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative min-h-[75vh] overflow-hidden border-b border-white/10">

        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/CEO.jpeg"
            alt="NPG streetwear"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#100704] via-[#100704]/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative mx-auto flex min-h-[75vh] max-w-7xl items-center px-6 lg:px-8">

          <div
            data-aos="fade-right"
            className="max-w-3xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-12 bg-[#e59a38]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#e59a38]">
                About NPG
              </span>
            </div>

            <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-8xl">
              More Than
              <span className="block text-[#e59a38]">
                Clothing.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              NPG is a streetwear brand built around individuality,
              confidence and culture. We create pieces for people
              who don't simply follow the street — they create their
              own direction.
            </p>

            <div className="mt-10">
              <a
                href="/shop"
                className="group inline-flex items-center gap-4 bg-[#e59a38] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-[#f3b64c]"
              >
                Explore NPG
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>

        </div>

        {/* NPG watermark */}
        <div className="pointer-events-none absolute bottom-[-25px] right-[-10px] hidden select-none text-[16rem] font-black leading-none text-white/[0.025] lg:block">
          NPG
        </div>
      </section>


      {/* =====================================================
          OUR STORY
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Image */}
          <div
            data-aos="fade-right"
            className="relative"
          >
            <div className="absolute -left-4 -top-4 h-24 w-24 border-l border-t border-[#e59a38]" />

            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="/CEO.jpeg"
                alt="NPG brand story"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="absolute -bottom-5 -right-5 hidden bg-[#e59a38] px-8 py-6 text-black sm:block">
              <p className="text-3xl font-black">NPG</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em]">
                Own The Street
              </p>
            </div>
          </div>

          {/* Text */}
          <div data-aos="fade-left">

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#e59a38]">
              Our Story
            </p>

            <h2 className="text-4xl font-black uppercase leading-tight sm:text-5xl">
              Built From
              <span className="block text-white/40">
                The Culture.
              </span>
            </h2>

            <div className="mt-8 space-y-5 text-sm leading-7 text-white/60 sm:text-base">

              <p>
                NPG represents a mindset. It is about expressing yourself
                without waiting for permission and wearing pieces that
                feel authentic to who you are.
              </p>

              <p>
                From everyday essentials to statement streetwear, our
                collections are designed to bring together comfort,
                character and modern street culture.
              </p>

              <p>
                We are building a brand where clothing becomes more than
                something you wear. It becomes part of your identity,
                your movement and your story.
              </p>

            </div>

            {/* Quote */}
            <div className="mt-10 border-l-2 border-[#e59a38] pl-6">
              <p className="text-xl font-semibold italic text-white sm:text-2xl">
                "Don't follow the street.
                <span className="text-[#e59a38]">
                  {" "}Create your own.
                </span>"
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          MISSION
      ===================================================== */}
      <section className="border-y border-white/10 bg-[#160a06]">

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">

          <div
            data-aos="fade-up"
            className="mx-auto max-w-4xl text-center"
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#e59a38]">
              Our Mission
            </p>

            <h2 className="text-4xl font-black uppercase leading-tight sm:text-5xl md:text-6xl">
              Wear Your
              <span className="text-[#e59a38]"> Identity.</span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
              Our mission is to create streetwear that gives people the
              freedom to express themselves while building a community
              connected by creativity, confidence and culture.
            </p>
          </div>

          {/* Mission numbers */}
          <div className="mt-16 grid border border-white/10 sm:grid-cols-3">

            <div
              data-aos="fade-up"
              className="border-b border-white/10 p-8 text-center sm:border-b-0 sm:border-r"
            >
              <p className="text-4xl font-black text-[#e59a38]">
                01
              </p>

              <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em]">
                Create
              </p>

              <p className="mt-2 text-xs text-white/40">
                Create without limits.
              </p>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="border-b border-white/10 p-8 text-center sm:border-b-0 sm:border-r"
            >
              <p className="text-4xl font-black text-[#e59a38]">
                02
              </p>

              <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em]">
                Express
              </p>

              <p className="mt-2 text-xs text-white/40">
                Let your style speak.
              </p>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="p-8 text-center"
            >
              <p className="text-4xl font-black text-[#e59a38]">
                03
              </p>

              <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em]">
                Inspire
              </p>

              <p className="mt-2 text-xs text-white/40">
                Inspire the next move.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          VALUES
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

        <div
          data-aos="fade-up"
          className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#e59a38]">
              What We Stand For
            </p>

            <h2 className="text-4xl font-black uppercase sm:text-5xl">
              Our Values
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-white/45">
            The principles behind every NPG piece, collection and
            community experience.
          </p>
        </div>

        <div className="grid border-l border-t border-white/10 sm:grid-cols-2">

          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <div
                key={value.number}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group relative border-b border-r border-white/10 p-8 transition duration-300 hover:bg-[#160a06] sm:p-10"
              >

                {/* Number */}
                <div className="flex items-start justify-between">

                  <span className="text-sm font-bold text-[#e59a38]">
                    {value.number}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center border border-white/10 transition group-hover:border-[#e59a38] group-hover:bg-[#e59a38] group-hover:text-black">
                    <Icon size={21} />
                  </div>

                </div>

                <h3 className="mt-12 text-2xl font-bold uppercase">
                  {value.title}
                </h3>

                <p className="mt-4 max-w-md text-sm leading-7 text-white/45">
                  {value.text}
                </p>

                <div className="mt-8 h-px w-10 bg-[#e59a38] transition-all duration-300 group-hover:w-20" />

              </div>
            );
          })}

        </div>
      </section>


      {/* =====================================================
          BRAND STATEMENT
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#e59a38] text-black">

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

          <div
            data-aos="fade-up"
            className="relative z-10"
          >
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.35em]">
              NPG Philosophy
            </p>

            <h2 className="max-w-5xl text-4xl font-black uppercase leading-[0.95] sm:text-6xl md:text-8xl">
              Nothing
              <br />
              Pass
              <br />
              God.
            </h2>

            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
              <p className="max-w-lg text-sm font-medium leading-7 text-black/65">
                Stay grounded. Stay authentic. Keep moving forward.
                NPG is a reminder to remain true to yourself while
                creating your own path.
              </p>

              <a
                href="/shop"
                className="group inline-flex w-fit items-center gap-3 border border-black px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-black hover:text-white"
              >
                Shop NPG
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>

          {/* Background text */}
          <div className="pointer-events-none absolute -bottom-16 right-0 select-none text-[12rem] font-black leading-none text-black/5 md:text-[20rem]">
            NPG
          </div>

        </div>
      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8 lg:py-32">

        <div data-aos="fade-up">

          <Heart
            className="mx-auto mb-6 text-[#e59a38]"
            size={28}
          />

          <h2 className="text-3xl font-black uppercase sm:text-5xl">
            Welcome To The
            <span className="text-[#e59a38]">
              {" "}NPG Culture.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/45">
            Find your style. Build your identity. Own your street.
          </p>

          <a
            href="/new-arrivals"
            className="group mt-8 inline-flex items-center gap-4 bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-[#e59a38]"
          >
            See New Arrivals
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>

        </div>

      </section>

    </main>
  );
}