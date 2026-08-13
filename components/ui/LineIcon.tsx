/** Los 9 iconos de línea de la sección 04 — Servicios marinos (stroke 1.5, cap/join round). */

type Shape =
  | { type: "path"; d: string }
  | { type: "circle"; cx: number; cy: number; r: number };

const iconShapes: Shape[][] = [
  // 01 contención de derrames
  [
    { type: "path", d: "M2 17h20" },
    { type: "path", d: "M4 13c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2" },
    { type: "path", d: "M7 9V5h10v4" },
  ],
  // 02 fendering
  [
    { type: "circle", cx: 8, cy: 12, r: 4 },
    { type: "circle", cx: 16, cy: 12, r: 4 },
  ],
  // 03 lightering STS
  [
    { type: "path", d: "M3 7h8v10H3z" },
    { type: "path", d: "M13 10h8v7h-8z" },
    { type: "path", d: "M11 12h2" },
  ],
  // 04 remolque
  [
    { type: "path", d: "M4 18h16" },
    { type: "path", d: "M6 18V9l6-4 6 4v9" },
    { type: "path", d: "M12 5v13" },
  ],
  // 05 servicios submarinos
  [
    { type: "circle", cx: 12, cy: 10, r: 5 },
    { type: "path", d: "M12 15v6" },
    { type: "path", d: "M9 18h6" },
  ],
  // 06 fenders Yokohama
  [
    { type: "circle", cx: 12, cy: 12, r: 8 },
    { type: "path", d: "M12 4v16" },
  ],
  // 07 salvamento
  [
    { type: "path", d: "M3 16l6-8 5 6 3-3 4 5" },
    { type: "path", d: "M3 20h18" },
  ],
  // 08 bombeo
  [
    { type: "path", d: "M6 3h8l4 6v12H6z" },
    { type: "path", d: "M10 13h6" },
    { type: "path", d: "M10 17h6" },
  ],
  // 09 lubricantes, químicos y gases
  [
    { type: "path", d: "M7 4h6v6H7z" },
    { type: "path", d: "M9 10v4a3 3 0 003 3h4" },
    { type: "path", d: "M17 15h4v5h-4z" },
  ],
];

export function LineIcon({ index }: { index: number }) {
  const shapes = iconShapes[index] ?? [];
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0C1D38"
      strokeWidth={1.5}
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
