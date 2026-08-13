"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { otherLocale } from "@/lib/i18n";

type Props = { d: Dictionary; locale: Locale };

export function Header({ d, locale }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const next = otherLocale(locale);

  const links = [
    { href: "#agency", label: d.nav.agency },
    { href: "#launch", label: d.nav.launch },
    { href: "#portcall", label: d.nav.portCall },
    { href: "#marine", label: d.nav.marine },
    { href: "#ports", label: d.nav.ports },
    { href: "#brochure", label: d.nav.brochure },
  ];

  // Scroll-spy: marca el ancla visible con aria-current
  useEffect(() => {
    const ids = ["agency", "launch", "portcall", "marine", "ports", "brochure"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      // la banda descuenta el header sticky y se queda con el tercio superior del viewport
      { rootMargin: "-130px 0px -60% 0px", threshold: [0.01, 0.25, 0.5] },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-20 border-b border-hair bg-white">
      <div className="rail flex items-center justify-between py-[14px]">
        <Link href={`/${locale}#top`} className="flex items-center" aria-label="Linde Port Agency">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/linde-logo-horizontal.svg"
            alt="Linde Port Agency"
            className="block h-[44px] w-auto lg:h-[60px]"
          />
        </Link>

        <nav className="hidden items-center gap-7 text-[14px] font-medium xl:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "true" : undefined}
              className={`border-b-2 py-[6px] transition-colors duration-[0.18s] hover:border-red ${
                active === l.href ? "border-red" : "border-transparent"
              }`}
            >
              {l.label}
            </a>
          ))}
          <LangButton d={d} next={next} />
          <a
            href="#contact"
            className="bg-navy px-6 py-[13px] text-[12px] font-semibold tracking-[0.09em] text-white transition-[background,transform] duration-200 hover:-translate-y-[2px] hover:bg-red"
          >
            {d.nav.ctaQuote}
          </a>
        </nav>

        {/* Compacto: el CTA rojo cabe desde 640px; por debajo vive en el menú full-screen */}
        <div className="flex items-center gap-3 xl:hidden">
          <a
            href="#contact"
            className="hidden bg-red px-4 py-[11px] text-[11px] font-semibold tracking-[0.09em] text-white transition-colors hover:bg-red-hover sm:inline-block"
          >
            {d.nav.ctaQuote}
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="lp-mobile-nav"
            className="mono border border-rule-3 px-3 py-[10px] text-[11px] tracking-[0.12em] text-navy"
          >
            {d.nav.menu}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="lp-mobile-nav"
          className="fixed inset-0 z-30 flex flex-col bg-white xl:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="rail flex items-center justify-between border-b border-hair py-[14px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/linde-logo-horizontal.svg" alt="Linde Port Agency" className="h-[44px] w-auto" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mono border border-rule-3 px-3 py-[10px] text-[11px] tracking-[0.12em]"
            >
              {d.nav.close}
            </button>
          </div>
          <nav className="rail flex flex-1 flex-col gap-1 py-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-hair py-4 text-[20px] font-semibold"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-8 flex flex-col gap-4">
              <LangButton d={d} next={next} />
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="bg-navy px-6 py-[16px] text-center text-[12px] font-semibold tracking-[0.09em] text-white"
              >
                {d.nav.ctaQuote}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function LangButton({ d, next }: { d: Dictionary; next: Locale }) {
  return (
    <Link
      href={`/${next}`}
      title={d.nav.langTitle}
      hrefLang={next}
      className="mono flex items-center justify-center gap-2 border border-rule-3 px-[14px] py-[9px] text-[11px] tracking-[0.12em] text-navy transition-[background,color,border-color] duration-200 hover:border-navy hover:bg-navy hover:text-white"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[14px] w-[14px] flex-none"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.6 3 2.6 15 0 18M12 3c-2.6 3-2.6 15 0 18" />
      </svg>
      {d.nav.langNext}
    </Link>
  );
}
