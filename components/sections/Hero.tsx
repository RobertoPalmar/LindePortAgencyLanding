import type { Dictionary } from "@/lib/i18n";

export function Hero({ d }: { d: Dictionary }) {
  return (
    <section id="top" className="relative overflow-hidden bg-navy">
      <div className="rail pointer-events-none relative grid items-center gap-12 pb-6 pt-16 lg:grid-cols-2 lg:pt-[92px]">
        {/* Una columna: el logo va arriba y el texto centrado; a partir de lg, dos columnas */}
        <div className="order-2 animate-rise text-center lg:order-1 lg:text-left">
          <div className="mono text-[12px] tracking-[0.24em] text-pink">{d.hero.eyebrow}</div>
          <h1 className="mt-6 text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-paper lg:text-[60px]">
            {d.hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] text-[17px] leading-[1.55] text-onNavy lg:mx-0 lg:text-[19px]">
            {d.hero.body}
          </p>
          <div className="pointer-events-auto mt-[38px] flex flex-wrap justify-center gap-[14px] lg:justify-start">
            <a
              href="#contact"
              className="bg-red px-[30px] py-[17px] text-[13px] font-semibold tracking-[0.1em] text-white transition-[background,transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:bg-red-hover hover:shadow-cta"
            >
              {d.hero.ctaContact}
            </a>
            <a
              href="#agency"
              className="border border-navy-outline px-[30px] py-[17px] text-[13px] font-semibold tracking-[0.1em] text-paper transition-[border-color,background] duration-200 hover:border-paper hover:bg-paper/10"
            >
              {d.hero.ctaServices}
            </a>
          </div>
        </div>
        <div className="order-1 flex justify-center lg:order-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/linde-logo-light.svg"
            alt="Linde Port Agency"
            className="w-[280px] animate-riseSlow md:w-[380px] lg:w-[500px]"
          />
        </div>
      </div>

      {/* Banda de olas: dos paths al 200% de ancho desplazándose 16s en bucle */}
      <div className="relative -mt-px h-[96px] overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="block h-[97px] w-[200%] animate-drift"
        >
          <path
            d="M0 46 C 90 24 180 24 270 46 C 360 68 450 68 540 46 C 630 24 720 24 810 46 C 900 68 990 68 1080 46 C 1170 24 1260 24 1350 46 C 1395 57 1420 57 1440 46 L1440 96 L0 96 Z"
            fill="#F7F6F2"
            opacity="0.22"
          />
          <path
            d="M0 64 C 90 48 180 48 270 64 C 360 80 450 80 540 64 C 630 48 720 48 810 64 C 900 80 990 80 1080 64 C 1170 48 1260 48 1350 64 C 1395 72 1420 72 1440 64 L1440 96 L0 96 Z"
            fill="#F7F6F2"
          />
        </svg>
      </div>
    </section>
  );
}
