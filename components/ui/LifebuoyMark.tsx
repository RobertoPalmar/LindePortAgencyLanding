/**
 * Salvavidas de línea: decoración de la sección 01 — Agencia.
 * Misma familia gráfica que la rosa de los vientos del brochure y el ancla de contacto:
 * solo trazo, sin degradados, con un único paño en rojo de marca.
 */

const R_BAND = 82; // radio de la banda del aro
const BAND = 34; // grosor de la banda
const C = 2 * Math.PI * R_BAND;
const PANEL = C / 8; // paño de 45°

export function LifebuoyMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="#DCD8CC"
      strokeWidth={2.4}
      strokeLinecap="round"
    >
      {/* paños alternos del aro */}
      <circle
        cx="120"
        cy="120"
        r={R_BAND}
        stroke="#EFEDE6"
        strokeWidth={BAND}
        strokeDasharray={`${PANEL} ${PANEL}`}
      />
      {/* un paño en rojo: colocado a la izquierda para que no lo corte el borde de la banda */}
      <g transform="rotate(160 120 120)">
        <circle
          cx="120"
          cy="120"
          r={R_BAND}
          stroke="#C8102E"
          strokeWidth={BAND}
          strokeDasharray={`${PANEL} ${C - PANEL}`}
          opacity="0.45"
        />
      </g>
      {/* cantos del aro */}
      <circle cx="120" cy="120" r={R_BAND + BAND / 2} />
      <circle cx="120" cy="120" r={R_BAND - BAND / 2} />
      {/* trincas de cabo en las juntas de los paños */}
      {[45, 135, 225, 315].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 120 120)`}>
          <path d="M182 120h44" strokeWidth={2} />
          <path d="M188 112v16M212 112v16" strokeWidth={1.6} />
        </g>
      ))}
    </svg>
  );
}
