/**
 * Hélice de línea: decoración de la sección 01 — Agencia.
 * Misma familia gráfica que la rosa de los vientos del brochure y el ancla de contacto:
 * solo trazo, sin relleno ni degradados, con un único acento rojo en el núcleo.
 */
export function PropellerMark({ className = "" }: { className?: string }) {
  // pala asimétrica (borde de ataque y de salida distintos) para que lea como hélice
  const blade = "M120 100C102 82 96 50 114 24c20 16 26 52 6 76z";

  return (
    <svg
      viewBox="0 0 240 240"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="#DCD8CC"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="120" cy="120" r="104" />
      <circle cx="120" cy="120" r="88" strokeWidth={1.2} />
      {[0, 90, 180, 270].map((deg) => (
        <path key={deg} d={blade} transform={`rotate(${deg} 120 120)`} />
      ))}
      <circle cx="120" cy="120" r="20" />
      <circle cx="120" cy="120" r="9" />
      <circle cx="120" cy="120" r="4.5" fill="#C8102E" stroke="none" />
    </svg>
  );
}
