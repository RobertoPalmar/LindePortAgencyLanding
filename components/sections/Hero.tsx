import type { Dictionary } from "@/lib/i18n";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";

/** Clip del hero. Una línea para cambiarlo. */
const HERO_VIDEO = "/video/hero.mp4";

export function Hero({ d }: { d: Dictionary }) {
  // Alto de pantalla menos el chrome fijo: la banda de olas cierra justo en el pliegue.
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-var(--chrome))] flex-col overflow-hidden bg-navy"
    >
      {/* `seamFade` funde en la costura del bucle: el reinicio entra y sale, no salta */}
      <BackgroundVideo src={HERO_VIDEO} className="saturate-[1.15]" />
      {/* Solo el contraste que el texto necesita: base tenue + degradado arriba y abajo */}
      <div aria-hidden="true" className="absolute inset-0 bg-navy/40" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navy/55 via-transparent to-navy/70"
      />

      {/*
       * `flex-1` reparte el alto sobrante. El padding superior es mayor que el
       * inferior a propósito: sobre una caja centrada, esa asimetría baja el
       * bloque sin anclarlo al pie, así en pantallas muy altas sigue equilibrado.
       */}
      <div className="rail pointer-events-none relative flex flex-1 items-center pb-14 pt-24 lg:pb-20 lg:pt-[200px]">
        {/*
         * En móvil el bloque es la pantalla entera. A partir de lg se retira a una
         * columna angosta a la izquierda y baja de escala: el centro y la derecha
         * quedan para el vídeo, que es el protagonista de la banda.
         */}
        {/* La sombra de texto sustituye al velo: legibilidad sin oscurecer el fotograma */}
        <div className="mx-auto max-w-[680px] animate-rise text-center [text-shadow:0_2px_16px_rgba(12,29,56,0.85)] lg:mx-0 lg:max-w-[460px] lg:text-left">
          <div className="mono text-[11.5px] tracking-[0.22em] text-pink lg:text-[10.5px]">
            {d.hero.eyebrow}
          </div>
          <h1 className="mt-5 text-[34px] font-bold leading-[1.08] tracking-[-0.02em] text-paper lg:text-[38px]">
            {d.hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-[600px] text-[15.5px] leading-[1.55] text-onNavy-3 lg:mx-0">
            {d.hero.body}
          </p>
          <div className="pointer-events-auto mt-8 flex flex-wrap justify-center gap-[12px] [text-shadow:none] lg:justify-start">
            <a
              href="#contact"
              className="bg-red px-[24px] py-[14px] text-[12px] font-semibold tracking-[0.1em] text-white transition-[background,transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:bg-red-hover hover:shadow-cta"
            >
              {d.hero.ctaContact}
            </a>
            <a
              href="#agency"
              className="border border-navy-outline px-[24px] py-[14px] text-[12px] font-semibold tracking-[0.1em] text-paper transition-[border-color,background] duration-200 hover:border-paper hover:bg-paper/10"
            >
              {d.hero.ctaServices}
            </a>
          </div>
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
