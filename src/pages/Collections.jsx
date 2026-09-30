import {
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

const collections = [
  {
    number: "01",
    name: "NPG Essentials",
    description: "Clean everyday pieces built for the streets.",
    image: "/cloth2.jpeg",
    items: "T-Shirts / Tops",
  },
  {
    number: "02",
    name: "NPG Denim",
    description: "Relaxed fits. Heavy attitude. No limits.",
    image: "/jean.jpeg",
    items: "Baggy Jeans / Denim",
  },
  {
    number: "03",
    name: "NPG Outerwear",
    description: "Statement layers made to stand out.",
    image: "/cloth1.jpeg",
    items: "Hoodies / Jackets",
  },
];

export default function Collections() {
  return (
    <section
      id="collections"
      className="bg-[#100704] px-6 py-20 md:px-12 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-[1500px]">

        {/* ================= HEADER ================= */}
        <div
          data-aos="fade-up"
          className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#e59a38]">
              NPG / Collections
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.06em] md:text-7xl lg:text-8xl">
              Explore
              <br />
              <span className="text-white/40">Our Collections.</span>
            </h2>
          </div>

          <p className="max-w-sm text-xs leading-6 text-white/45 md:text-sm">
            Discover the different sides of NPG. From everyday essentials
            to bold streetwear pieces made to define your style.
          </p>
        </div>

        {/* ================= COLLECTIONS ================= */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          {collections.map((collection, index) => (
            <div
              key={collection.number}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="group"
            >

              {/* IMAGE */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#1b0d08]">

                <img
                  src={collection.image}
                  alt={collection.name}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-700
                    ease-out
                    group-hover:scale-105
                  "
                />

                {/* DARK OVERLAY */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/90
                    via-black/20
                    to-transparent
                  "
                />

                {/* NUMBER */}
                <div
                  className="
                    absolute
                    left-5
                    top-5
                    text-xs
                    font-black
                    tracking-[0.2em]
                    text-[#e59a38]
                  "
                >
                  {collection.number}
                </div>

                {/* COLLECTION NAME ON IMAGE */}
                <div className="absolute bottom-0 left-0 right-0 p-6">

                  <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.25em] text-white/50">
                    {collection.items}
                  </p>

                  <h3
                    className="
                      text-3xl
                      font-black
                      uppercase
                      leading-none
                      tracking-[-0.04em]
                      md:text-4xl
                    "
                  >
                    {collection.name}
                  </h3>

                </div>

              </div>

              {/* INFO */}
              <div className="border-b border-white/10 py-5">

                <div className="flex items-start justify-between gap-5">

                  <p className="max-w-[250px] text-xs leading-5 text-white/45">
                    {collection.description}
                  </p>

                  <a
                    href="/shop"
                    className="
                      grid
                      h-11
                      w-11
                      shrink-0
                      place-items-center
                      rounded-full
                      border
                      border-white/20
                      transition
                      duration-300
                      group-hover:border-[#e59a38]
                      group-hover:bg-[#e59a38]
                      group-hover:text-black
                    "
                    aria-label={`Shop ${collection.name}`}
                  >
                    <ArrowRight
                      size={17}
                      className="
                        transition
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </a>

                </div>

              </div>

            </div>
          ))}

        </div>

        {/* ================= BOTTOM BANNER ================= */}
        <div
          data-aos="fade-up"
          className="
            relative
            mt-16
            overflow-hidden
            border
            border-white/10
            bg-[#160a06]
            px-6
            py-10
            md:px-10
            md:py-12
          "
        >

          {/* BACKGROUND NPG */}
          <div
            className="
              pointer-events-none
              absolute
              right-[-20px]
              top-1/2
              -translate-y-1/2
              select-none
              text-[8rem]
              font-black
              leading-none
              tracking-[-0.08em]
              text-white/[0.025]
              md:text-[13rem]
            "
          >
            NPG
          </div>

          <div
            className="
              relative
              z-10
              flex
              flex-col
              items-start
              justify-between
              gap-8
              md:flex-row
              md:items-center
            "
          >

            <div>

              <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-[#e59a38]">
                Nothing Pass God
              </p>

              <h3
                className="
                  text-3xl
                  font-black
                  uppercase
                  leading-none
                  tracking-[-0.05em]
                  md:text-5xl
                "
              >
                Find Your
                <span className="text-white/40"> Collection.</span>
              </h3>

            </div>

            <a
              href="/shop"
              className="
                group
                flex
                items-center
                gap-6
                bg-[#e59a38]
                px-7
                py-4
                text-[9px]
                font-black
                uppercase
                tracking-[0.2em]
                text-black
                transition
                duration-300
                hover:bg-white
              "
            >
              Shop all

              <ArrowRight
                size={17}
                className="transition group-hover:translate-x-1"
              />
            </a>

          </div>

        </div>

        {/* ================= COLLECTION FOOTER ================= */}
        <div
          data-aos="fade-up"
          className="
            mt-8
            flex
            items-center
            justify-center
            gap-3
            text-center
            text-[9px]
            font-bold
            uppercase
            tracking-[0.25em]
            text-white/30
          "
        >
          <ShoppingBag
            size={14}
            className="text-[#e59a38]"
          />

          NPG — Own The Street
        </div>

      </div>
    </section>
  );
}