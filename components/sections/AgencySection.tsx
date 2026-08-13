import type { Dictionary } from "@/lib/i18n";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { PropellerMark } from "@/components/ui/PropellerMark";

/**
 * 01 — Agencia. Banda a sangre: la foto vertical pone su propio marco y la columna
 * de texto su propio padding (no usa el riel de `SectionBand`).
 */
export function AgencySection({ d }: { d: Dictionary }) {
  return (
    <section
      id="agency"
      className="grid border-t border-hair bg-paper lg:grid-cols-[520px_1fr]"
    >
      {/* Columna izquierda: foto vertical a sangre con placa navy abajo-izquierda */}
      <div className="relative min-h-[380px] overflow-hidden bg-panel-2 lg:min-h-[640px]">
        <ImageFrame
          src="/photos/agency/agency-vertical.jpg"
          alt={d.agency.photoAlt}
          sizes="(max-width: 1023px) 100vw, 520px"
          fillParent
        />
        <div className="mono absolute bottom-0 left-0 bg-navy px-6 py-4 text-[11.5px] tracking-[0.18em] text-paper">
          {d.agency.plate}
        </div>
      </div>

      <div className="relative overflow-hidden px-[var(--rail)] pb-[72px] pt-16 lg:py-[96px] lg:pb-[104px] lg:pl-16 lg:pr-[72px]">
        {/* Hélice de línea: llena el aire de la esquina inferior derecha */}
        <PropellerMark className="pointer-events-none absolute bottom-[-70px] right-[-60px] h-[320px] w-[320px] opacity-70" />

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
                className="group flex min-h-[54px] items-baseline gap-3 border-b border-rule py-[14px] transition-colors duration-[0.22s] hover:bg-hover-cream"
              >
                {/* el índice mono rojo hace de acento, como en las tarjetas de marinos */}
                <span className="mono w-[20px] flex-none text-[10.5px] tracking-[0.14em] text-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[16px] font-medium leading-[1.35]">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
