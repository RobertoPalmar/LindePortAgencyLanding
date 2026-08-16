import type { Dictionary } from "@/lib/i18n";
import { SectionBand } from "@/components/ui/SectionBand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { VesselMark } from "@/components/ui/VesselMark";

/** 03 — Anatomía de una escala. El hover se resuelve con group-hover: la sección es server. */
export function PortCallSection({ d }: { d: Dictionary }) {
  return (
    <SectionBand id="portcall" tone="paper">
      <SectionHeader
        eyebrow={d.portCall.eyebrow}
        title={d.portCall.title}
        body={d.portCall.body}
        bodyMax={420}
      />

      {/*
       * `overflow-hidden` recorta la derrota del buque. El carril mide el ancho
       * completo y se desplaza otro tanto, así que sin recorte su caja termina
       * al doble del riel y estira el documento: aparece una barra de scroll
       * horizontal en toda la página. Recortando acá, además, el buque entra y
       * sale por los bordes en vez de flotar fuera de la sección.
       */}
      <div className="relative overflow-hidden">
        {/*
         * Derrota del timeline, a la altura del centro de los dots. La línea va
         * punteada como una ruta de carta náutica, y el buque la recorre: la
         * escala es un viaje, de pre-arribo a zarpe. Queda por debajo de la
         * grilla, así que el buque desaparece detrás de cada etapa y reaparece.
         */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-[27px] hidden h-px lg:block"
        >
          <div className="h-px w-full bg-[repeating-linear-gradient(to_right,#C8102E_0_10px,transparent_10px_19px)] opacity-45" />
          {/* Carril al 100%: `translateX(100%)` lleva el buque de punta a punta */}
          <div className="absolute inset-y-0 left-0 w-full animate-sail motion-reduce:animate-none">
            <VesselMark className="absolute -top-[11px] left-0 -translate-x-1/2" />
          </div>
        </div>
        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {d.portCall.steps.map((s, i) => (
            <div key={s.title} className="group relative pb-[26px]">
              <div className="mono flex h-[54px] w-[54px] items-center justify-center border border-navy bg-navy text-[13px] tracking-[0.08em] text-paper transition-[background,border-color,transform] duration-[0.24s] group-hover:scale-[1.08] group-hover:border-red group-hover:bg-red">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-[22px] text-[18px] font-semibold leading-[1.3] tracking-[-0.01em]">
                {s.title}
              </div>
              <div className="mt-[10px] text-[14.5px] leading-[1.55] text-ink-soft">{s.body}</div>
              <div className="absolute bottom-0 left-0 h-[3px] w-full bg-hair transition-colors duration-[0.24s] group-hover:bg-red" />
            </div>
          ))}
        </div>
      </div>
    </SectionBand>
  );
}
