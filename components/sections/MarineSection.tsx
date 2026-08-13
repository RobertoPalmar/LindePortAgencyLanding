import type { Dictionary } from "@/lib/i18n";
import { SectionBand } from "@/components/ui/SectionBand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LineIcon } from "@/components/ui/LineIcon";

/** 04 — Servicios marinos. Tarjetas compactas, descripción siempre visible. */
export function MarineSection({ d }: { d: Dictionary }) {
  return (
    <SectionBand id="marine" tone="white">
      <SectionHeader
        eyebrow={d.marine.eyebrow}
        title={d.marine.title}
        body={d.marine.body}
        bodyMax={430}
      />

      <div className="grid gap-px border border-hair bg-hair sm:grid-cols-2 lg:grid-cols-3">
        {d.marine.items.map((m, i) => (
          <div
            key={m.title}
            className="group relative min-h-[176px] bg-white px-[26px] pb-7 pt-6 transition-colors duration-[0.24s] hover:bg-hover-cream"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-[38px] w-[38px] items-center justify-center border border-hair transition-[background,border-color] duration-[0.24s] group-hover:border-red group-hover:bg-white">
                <LineIcon index={i} />
              </div>
              <span className="mono text-[11px] tracking-[0.16em] text-red">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-4 text-[17px] font-semibold leading-[1.25] tracking-[-0.01em]">
              {m.title}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.5] text-ink-soft">{m.short}</p>
            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-red transition-[width] duration-[0.34s] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-full" />
          </div>
        ))}
      </div>
    </SectionBand>
  );
}
