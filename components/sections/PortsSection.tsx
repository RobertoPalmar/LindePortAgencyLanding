"use client";

import { useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { portNames, portPhotos } from "@/lib/ports";

/** 05 — Puertos. Riel seleccionable por hover y por click; el panel hace cross-fade. */
export function PortsSection({ d }: { d: Dictionary }) {
  const [port, setPort] = useState(0);
  const sel = d.ports.items[port];

  return (
    <section id="ports" className="bg-navy text-paper">
      <div className="rail band-y">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mono text-[12px] tracking-[0.2em] text-pink">{d.ports.eyebrow}</div>
            <h2 className="mt-5 text-[30px] font-bold leading-[1.12] tracking-[-0.015em] lg:text-[40px]">
              {d.ports.title}
            </h2>
          </div>
          <div className="mono text-[12px] tracking-[0.16em] text-ink-muteDark">{d.ports.note}</div>
        </div>

        <div className="mt-11 grid border border-navy-line lg:grid-cols-[300px_1fr]">
          {/* Riel de puertos */}
          <div className="flex flex-col border-b border-navy-line lg:border-b-0 lg:border-r">
            {portNames.map((name, i) => {
              const on = port === i;
              return (
                <button
                  key={name}
                  type="button"
                  onMouseEnter={() => setPort(i)}
                  onFocus={() => setPort(i)}
                  onClick={() => setPort(i)}
                  aria-pressed={on}
                  className={`flex items-center gap-3 border-b border-navy-line px-[22px] py-[21px] text-left transition-colors duration-[0.22s] ${
                    on ? "bg-navy-3" : "bg-transparent"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-[26px] w-[3px] flex-none transition-colors duration-[0.22s] ${
                      on ? "bg-red" : "bg-transparent"
                    }`}
                  />
                  <span className="mono flex-none text-[10.5px] tracking-[0.14em] text-ink-mute">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 text-[18px] tracking-[-0.01em] transition-colors duration-[0.22s] ${
                      on ? "font-bold text-paper" : "font-medium text-onNavy-2"
                    }`}
                  >
                    {name}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`text-[15px] text-red transition-[opacity,transform] duration-[0.22s] ${
                      on ? "translate-x-0 opacity-100" : "-translate-x-[6px] opacity-0"
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
            <div className="mt-auto border-t border-navy-line px-[26px] pb-[26px] pt-6">
              <div className="mono text-[10.5px] tracking-[0.16em] text-pink">{d.ports.railNote}</div>
              <div className="mt-[10px] text-[13.5px] leading-[1.55] text-onNavy-2">
                {d.ports.railBody}
              </div>
            </div>
          </div>

          {/* Panel con las 5 fotos en cross-fade */}
          <div className="relative min-h-[470px] overflow-hidden bg-navy-2">
            {portPhotos.map((photo, i) => (
              <div
                key={photo}
                className="absolute inset-0 transition-opacity duration-[0.42s] ease-linear"
                style={{ opacity: port === i ? 1 : 0 }}
                aria-hidden={port !== i}
              >
                <Image
                  src={photo}
                  alt={portNames[i]}
                  fill
                  sizes="(max-width: 1023px) 100vw, 900px"
                  priority={i === 0}
                  className="object-cover"
                />
              </div>
            ))}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(12,29,56,0.88) 0%, rgba(12,29,56,0.62) 34%, rgba(12,29,56,0.16) 62%, rgba(12,29,56,0) 100%)",
              }}
            />
            <div className="relative max-w-[580px] px-[26px] py-10 lg:px-[46px] lg:pb-[42px] lg:pt-[46px]">
              <div className="mono flex items-center gap-[10px] text-[10.5px] tracking-[0.16em] text-pink">
                <span aria-hidden="true" className="inline-block h-[6px] w-[6px] rounded-full bg-red" />
                {d.ports.active}
              </div>
              <div className="mt-[14px] text-[34px] font-bold leading-[1.05] tracking-[-0.02em] lg:text-[46px]">
                {portNames[port]}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {sel.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-navy-line3 px-[13px] py-[7px] text-[12.5px] text-onNavy-3"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
