import type { Dictionary } from "@/lib/i18n";
import { SectionBand } from "@/components/ui/SectionBand";
import { SectionHeader } from "@/components/ui/SectionHeader";

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

      <div className="relative">
        {/* línea del timeline, a la altura del centro de los dots */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-[27px] hidden h-px bg-red opacity-35 lg:block"
        />
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
