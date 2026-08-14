/**
 * Buque de perfil: recorre el riel de la sección 03 — Anatomía de una escala.
 * Misma familia gráfica que el salvavidas y los iconos de línea: silueta plana,
 * sin degradados, con un único acento en el rojo de marca (la chimenea).
 */

const NAVY = "#0C1D38";
const RED = "#C8102E";

export function VesselMark({ className = "" }: { className?: string }) {
  return (
    <svg
      width={38}
      height={22}
      viewBox="0 0 38 22"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Estela: dos trazos que se desvanecen hacia popa */}
      <path d="M1 17h6" stroke={RED} strokeWidth={1.5} strokeLinecap="round" opacity={0.4} />
      <path d="M4 13h4" stroke={RED} strokeWidth={1.5} strokeLinecap="round" opacity={0.2} />
      {/* Casco */}
      <path d="M11 10h26l-4 7H13z" fill={NAVY} />
      {/* Superestructura a popa y chimenea roja */}
      <path d="M27 10V4h5v6z" fill={NAVY} />
      <path d="M28.5 4V1h2v3z" fill={RED} />
      {/* Mástil de proa */}
      <path d="M16 10V5" stroke={NAVY} strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}
