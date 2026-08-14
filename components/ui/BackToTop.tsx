"use client";

import { useEffect, useState } from "react";

/** Píxeles de scroll antes de que el botón aparezca: pasado el primer pliegue. */
const REVEAL_AT = 600;

/**
 * Vuelta arriba flotante, abajo a la derecha.
 * - Aparece recién pasado el primer pliegue: en el hero no tiene nada que hacer.
 * - Sube con scroll suave; con `prefers-reduced-motion: reduce` salta sin animar.
 * - Es `button` y no `<a href="#top">` a propósito: no ensucia la URL con el ancla
 *   y no deja una entrada de historial por cada click.
 */
export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > REVEAL_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={label}
      title={label}
      // Oculto también para el teclado y los lectores mientras está invisible
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-20 flex h-[52px] w-[52px] items-center justify-center border border-navy-line bg-navy text-paper shadow-cta transition-[opacity,transform,background-color] duration-300 hover:bg-red ${
        visible ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
