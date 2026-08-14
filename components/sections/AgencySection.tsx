import type { Dictionary } from "@/lib/i18n";
import { portNames } from "@/lib/ports";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { LifebuoyMark } from "@/components/ui/LifebuoyMark";

/**
 * 01 — Agencia. Banda a sangre: la columna de medios pone su propio marco y la
 * columna de texto su propio padding (no usa el riel de `SectionBand`).
 */
export function AgencySection({ d }: { d: Dictionary }) {
  return (
    <section id="agency" className="border-t border-hair bg-paper">
      {/* Dentro del riel: la banda ya no llega al borde del viewport */}
      <div className="rail grid lg:grid-cols-[680px_1fr]">
        {/*
         * Columna de medios: vídeo velado como el hero, logo centrado y placa.
         * `self-center` + alto fijo: sin salir del estirado, el grid lo llevaría a
         * igualar la columna de texto, que es la que manda la altura de la banda.
         */}
        <div className="group relative min-h-[320px] overflow-hidden border-l-[10px] border-navy bg-navy lg:h-[720px] lg:min-h-0 lg:self-center">
        {/* La foto vertical queda de póster: cubre la carga y el autoplay bloqueado */}
        <BackgroundVideo
          src="/video/agency.mp4"
          poster="/photos/agency/agency-vertical.jpg"
          seamFade={false}
          className="saturate-[1.15]"
        />
        {/* Mismo velo que el hero, para que las dos bandas de vídeo se lean igual */}
        <div aria-hidden="true" className="absolute inset-0 bg-navy/40" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-navy/55 via-transparent to-navy/70"
        />
        {/* El logo se centra en el hueco y respeta la placa del pie */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-10 pb-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/linde-logo-light.svg"
            alt="Linde Port Agency"
            className="w-[64%] max-w-[340px]"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-[76px] w-1 bg-red"
        />
        <div className="mono absolute bottom-0 left-0 bg-navy px-6 py-4 text-[11.5px] tracking-[0.18em] text-paper">
          {d.agency.plate}
        </div>
      </div>

        <div className="relative flex flex-col overflow-hidden pb-[72px] pt-16 lg:py-[96px] lg:pb-[104px] lg:pl-14">
        {/* Salvavidas de línea: llena el aire de la esquina inferior derecha */}
        <LifebuoyMark className="pointer-events-none absolute bottom-[-64px] right-[-52px] h-[340px] w-[340px] rotate-[18deg] opacity-75" />

        <div className="relative">
          <div aria-hidden="true" className="h-[2px] w-10 bg-red" />
          <div className="mono mt-5 text-[12px] tracking-[0.2em] text-red">{d.agency.plate}</div>
          <h2 className="mt-4 text-[30px] font-bold leading-[1.1] tracking-[-0.02em] lg:text-[40px]">
            {d.agency.title}
          </h2>
          <p className="mt-5 max-w-[560px] text-[17px] leading-[1.6] text-ink-soft">
            {d.agency.body}
          </p>

          <div className="mt-9 grid gap-x-10 sm:grid-cols-2">
            {d.agency.services.map((name, i) => (
              <div
                key={name}
                className="group relative flex min-h-[54px] items-baseline gap-3 overflow-hidden border-b border-rule py-[14px] pl-3 transition-colors duration-[0.22s] hover:bg-hover-cream"
              >
                {/* marca roja que entra desde la izquierda en hover */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-[1px] left-0 top-0 w-[3px] origin-bottom scale-y-0 bg-red transition-transform duration-[0.28s] ease-out group-hover:scale-y-100"
                />
                {/* el índice mono rojo hace de acento, como en las tarjetas de marinos */}
                <span className="mono w-[20px] flex-none text-[10.5px] tracking-[0.14em] text-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[16px] font-medium leading-[1.35] transition-transform duration-[0.28s] ease-out group-hover:translate-x-[3px]">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cierre: dónde se prestan estos servicios */}
        <div className="relative mt-auto flex flex-col gap-4 border-t-2 border-red pt-6 sm:flex-row sm:items-center sm:gap-8 lg:mt-12">
          <span className="mono flex-none text-[10.5px] tracking-[0.18em] text-ink-mute">
            {d.ports.railNote}
          </span>
          <div className="flex flex-wrap gap-2">
            {portNames.map((name) => (
              <span
                key={name}
                className="cursor-default border border-rule bg-white px-[13px] py-[7px] text-[12.5px] font-medium transition-[background,border-color,color,transform] duration-[0.22s] hover:-translate-y-[2px] hover:border-navy hover:bg-navy hover:text-paper"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
