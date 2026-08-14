"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { SectionBand } from "@/components/ui/SectionBand";
import { ImageFrame } from "@/components/ui/ImageFrame";

/** 06 — Brochure. El CTA abre un desplegable con los dos PDF. */
export function BrochureSection({ d }: { d: Dictionary }) {
  const [pick, setPick] = useState(false);
  const wrap = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!pick) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPick(false);
    const onClick = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setPick(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [pick]);

  return (
    <SectionBand id="brochure" tone="paper">
      <div className="relative grid border border-hair bg-white lg:grid-cols-[1.15fr_1fr]">
        {/*
         * La rosa de los vientos asoma por fuera de la tarjeta, así que necesita
         * recorte. Va en su propia capa y no en la tarjeta: ahí recortaba también
         * el desplegable de idioma, que se abre por debajo del botón.
         */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* rosa de los vientos */}
          <svg
            viewBox="0 0 240 240"
            className="absolute bottom-[-52px] left-[-46px] h-[240px] w-[240px] opacity-50"
            fill="none"
            stroke="#E4E1D8"
            strokeWidth={1.2}
          >
            <circle cx="120" cy="120" r="104" />
            <circle cx="120" cy="120" r="74" />
            <path d="M120 4v232M4 120h232M42 42l156 156M198 42L42 198" />
          </svg>
        </div>

        <div className="relative px-8 pb-[54px] pt-[58px] lg:px-14">
          <div className="mono text-[12px] tracking-[0.2em] text-red">{d.brochure.eyebrow}</div>
          <h2 className="mt-5 text-[28px] font-bold leading-[1.12] tracking-[-0.015em] lg:text-[38px]">
            {d.brochure.title}
          </h2>
          <p className="mt-5 max-w-[480px] text-[16.5px] leading-[1.6] text-ink-soft">
            {d.brochure.body}
          </p>
          <div className="mono mt-[30px] flex flex-wrap gap-[26px] text-[11.5px] tracking-[0.14em] text-ink-mute">
            <span>PDF</span>
            <span>{d.brochure.meta}</span>
            <span>EN / ES</span>
          </div>

          <div ref={wrap} className="relative mt-[34px] inline-block">
            <button
              type="button"
              onClick={() => setPick((v) => !v)}
              aria-expanded={pick}
              aria-haspopup="menu"
              className="bg-red px-[30px] py-[17px] text-[13px] font-semibold tracking-[0.1em] text-white transition-[background,transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:bg-red-hover hover:shadow-cta"
            >
              {d.brochure.cta}
            </button>
            <div
              role="menu"
              className="absolute left-0 top-[calc(100%+10px)] z-[5] min-w-[210px] border border-hair bg-white px-2 pb-2 pt-3 shadow-picker transition-[opacity,transform] duration-[0.18s]"
              style={{
                opacity: pick ? 1 : 0,
                transform: pick ? "translateY(0)" : "translateY(-6px)",
                pointerEvents: pick ? "auto" : "none",
              }}
            >
              <div className="mono px-1 pb-[10px] text-[10.5px] tracking-[0.16em] text-ink-mute">
                {d.brochure.pick}
              </div>
              <a
                role="menuitem"
                href="/brochure/linde-brochure-es.pdf"
                download="Linde-Port-Agency-ES.pdf"
                onClick={() => setPick(false)}
                className="block px-[14px] py-3 text-[14px] font-semibold text-navy transition-colors duration-[0.18s] hover:bg-panel"
              >
                {d.brochure.linkEs}
              </a>
              <a
                role="menuitem"
                href="/brochure/linde-brochure-en.pdf"
                download="Linde-Port-Agency-EN.pdf"
                onClick={() => setPick(false)}
                className="block px-[14px] py-3 text-[14px] font-semibold text-navy transition-colors duration-[0.18s] hover:bg-panel"
              >
                {d.brochure.linkEn}
              </a>
            </div>
          </div>
        </div>

        <div className="relative min-h-[300px] overflow-hidden bg-panel lg:min-h-[420px]">
          <ImageFrame
            src="/photos/brochure/bifold-mockup.png"
            alt={d.brochure.photoAlt}
            frame="panel"
            sizes="(max-width: 1023px) 100vw, 560px"
            fillParent
          />
        </div>
      </div>
    </SectionBand>
  );
}
