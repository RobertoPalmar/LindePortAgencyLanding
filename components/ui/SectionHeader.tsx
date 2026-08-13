import { Eyebrow } from "./Eyebrow";

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  tone?: "light" | "navy";
  /** ancho máximo del párrafo alineado a la derecha */
  bodyMax?: number;
};

/** Cabecera de banda: eyebrow + h2 a la izquierda, párrafo alineado a la derecha. */
export function SectionHeader({ eyebrow, title, body, tone = "light", bodyMax = 420 }: Props) {
  return (
    <div className="mb-9 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
      <div>
        <Eyebrow tone={tone === "navy" ? "pink" : "red"}>{eyebrow}</Eyebrow>
        <h2 className="mt-5 text-[30px] font-bold leading-[1.12] tracking-[-0.015em] lg:text-[40px]">
          {title}
        </h2>
      </div>
      <p
        className={`m-0 text-[16px] leading-[1.6] lg:text-right ${
          tone === "navy" ? "text-onNavy" : "text-ink-soft"
        }`}
        style={{ maxWidth: bodyMax }}
      >
        {body}
      </p>
    </div>
  );
}
