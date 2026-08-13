"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n";

const DURATION = 1400;
const TICK = 40;

export function StatsBand({ d }: { d: Dictionary }) {
  const targets = d.stats.map((s) => s.value);
  const [counts, setCounts] = useState<number[]>(() => targets.map(() => 0));
  const ref = useRef<HTMLElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let timer: ReturnType<typeof setInterval> | null = null;
    let fallback: ReturnType<typeof setTimeout> | null = null;
    let safety: ReturnType<typeof setTimeout> | null = null;

    const run = () => {
      if (started.current) return;
      started.current = true;

      if (reduced) {
        setCounts(targets);
        return;
      }

      const t0 = Date.now();
      timer = setInterval(() => {
        const p = Math.min(1, (Date.now() - t0) / DURATION);
        const e = 1 - Math.pow(1 - p, 3);
        setCounts(targets.map((v) => Math.round(v * e)));
        if (p >= 1 && timer) {
          clearInterval(timer);
          timer = null;
        }
      }, TICK);

      // red de seguridad: si el interval no llegó al final, pintar los valores
      safety = setTimeout(() => {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
        setCounts(targets);
      }, DURATION + 900);
    };

    if (!el || typeof IntersectionObserver === "undefined") {
      run();
    } else {
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            run();
            obs.disconnect();
          }
        },
        { threshold: 0.35 },
      );
      obs.observe(el);
      fallback = setTimeout(run, 1600);

      return () => {
        obs.disconnect();
        if (fallback) clearTimeout(fallback);
        if (safety) clearTimeout(safety);
        if (timer) clearInterval(timer);
      };
    }

    return () => {
      if (fallback) clearTimeout(fallback);
      if (safety) clearTimeout(safety);
      if (timer) clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={ref} className="border-y border-hair bg-white">
      {/* banda a sangre: el padding lo pone cada celda, como en el prototipo */}
      <div className="mx-auto grid w-full max-w-canvas grid-cols-2 lg:grid-cols-4">
        {d.stats.map((s, i) => (
          <div
            key={s.label}
            className="border-b border-r border-hair px-6 py-[26px] transition-colors duration-[0.22s] last:border-r-0 hover:bg-hover-cream lg:border-b-0 lg:px-10 lg:py-[34px]"
          >
            <div className="text-[30px] font-bold tracking-[-0.015em] tabular-nums lg:text-[36px]">
              {counts[i]}
            </div>
            <div className="mono mt-2 text-[11.5px] tracking-[0.16em] text-ink-mute">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
