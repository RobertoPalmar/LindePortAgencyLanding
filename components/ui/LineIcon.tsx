/**
 * Los 9 iconos de línea de la sección 04 — Servicios marinos (stroke 1.6, cap/join round).
 *
 * Cada uno dibuja el objeto del oficio —la barrera, el casco, el casco de buzo—
 * y no una forma abstracta: en una retícula de nueve, dos rectángulos y un par de
 * círculos no se distinguen entre sí ni dicen de qué servicio hablan.
 */

type Shape =
  | { type: "path"; d: string }
  | { type: "circle"; cx: number; cy: number; r: number };

const iconShapes: Shape[][] = [
  // 01 contención de derrames: gota de crudo sobre la barrera flotante
  [
    { type: "path", d: "M12 2.5c2.4 3.1 3.8 5 3.8 6.6a3.8 3.8 0 0 1-7.6 0c0-1.6 1.4-3.5 3.8-6.6z" },
    { type: "path", d: "M2 18.5c2 0 2-1.8 4-1.8s2 1.8 4 1.8 2-1.8 4-1.8 2 1.8 4 1.8 2-1.8 4-1.8" },
    { type: "circle", cx: 4, cy: 14, r: 1.3 },
    { type: "circle", cx: 12, cy: 14, r: 1.3 },
    { type: "circle", cx: 20, cy: 14, r: 1.3 },
  ],
  // 02 fendering de muelle: el fender entre el muro y el casco
  [
    { type: "path", d: "M3.5 3v18" },
    { type: "circle", cx: 9.5, cy: 12, r: 3.2 },
    { type: "path", d: "M15 4.5c3 3.4 3 11.6 0 15" },
  ],
  // 03 lightering STS: dos cascos abarloados y el trasvase entre ellos
  [
    { type: "path", d: "M2 13h8.5l-1.4 4.5H3.4z" },
    { type: "path", d: "M13.5 13H22l-1.4 4.5h-5.7z" },
    { type: "path", d: "M8.5 9h7" },
    { type: "path", d: "M13.5 7 15.5 9l-2 2" },
  ],
  // 04 remolque: la estampa del remolcador con el cabo tendido
  [
    { type: "path", d: "M2.5 14h11l-1.6 4.5H4.1z" },
    { type: "path", d: "M5.5 14v-3.5h5V14" },
    { type: "path", d: "M8 10.5V8" },
    { type: "path", d: "M14 11.5c3.5 0 4.5 2.5 7.5 2.5" },
  ],
  // 05 servicios submarinos: casco de buzo clásico y burbujas
  [
    { type: "circle", cx: 11, cy: 10.5, r: 5.5 },
    { type: "circle", cx: 11, cy: 10.5, r: 2 },
    { type: "path", d: "M8.2 15.6 7.5 19.5h7l-.7-3.9" },
    { type: "circle", cx: 19, cy: 5.5, r: 1.2 },
    { type: "circle", cx: 21, cy: 9, r: 0.8 },
  ],
  // 06 fenders Yokohama: el neumático y la manguera enrollada
  [
    { type: "path", d: "M4.5 7.5h4a4.5 4.5 0 0 1 0 9h-4a4.5 4.5 0 0 1 0-9z" },
    { type: "circle", cx: 18, cy: 14.5, r: 3.5 },
    { type: "circle", cx: 18, cy: 14.5, r: 1.2 },
  ],
  // 07 salvamento: la grúa izando, con el gancho reconocible sobre el agua
  [
    { type: "path", d: "M5 17V3.5h11" },
    { type: "path", d: "M16 3.5v6" },
    { type: "path", d: "M13.8 9.5h4.4" },
    { type: "path", d: "M16 9.5v3.2a2.2 2.2 0 1 0 4.4 0v-.7" },
    { type: "path", d: "M2 20.5h20" },
  ],
  // 08 bombeo: cuerpo de bomba, descarga y la gota que sale
  [
    { type: "circle", cx: 9, cy: 13.5, r: 4.5 },
    { type: "path", d: "M13.5 13.5h5" },
    { type: "path", d: "M18.5 13.5V9" },
    { type: "path", d: "M18.5 3c1.4 1.9 2.2 3 2.2 3.9a2.2 2.2 0 0 1-4.4 0c0-.9.8-2 2.2-3.9z" },
    { type: "path", d: "M9 9v-2.5" },
  ],
  // 09 lubricantes, químicos y gases: el bidón y la botella de gas
  [
    { type: "path", d: "M3.5 6.5h7.5v14H3.5z" },
    { type: "path", d: "M3.5 11h7.5" },
    { type: "path", d: "M3.5 16h7.5" },
    { type: "path", d: "M15 20.5v-7a3.5 3.5 0 0 1 7 0v7z" },
    { type: "path", d: "M18.5 10V7.5" },
  ],
];

export function LineIcon({ index }: { index: number }) {
  const shapes = iconShapes[index] ?? [];
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0C1D38"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {shapes.map((s, i) =>
        s.type === "circle" ? (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} />
        ) : (
          <path key={i} d={s.d} />
        ),
      )}
    </svg>
  );
}
