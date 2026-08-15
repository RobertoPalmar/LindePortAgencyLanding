/**
 * Sube al principio de la página.
 *
 * Con `prefers-reduced-motion: reduce` salta sin animar: ahí el salto seco es
 * la conducta correcta, no una versión degradada. El desplazamiento largo es
 * justo lo que molesta a quien pidió menos movimiento.
 */
export function scrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}
