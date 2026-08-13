import type { ReactNode } from "react";

export type Tone = "paper" | "white" | "navy";

const tones: Record<Tone, string> = {
  paper: "bg-paper border-t border-hair text-navy",
  white: "bg-white border-t border-hair text-navy",
  // las bandas navy no llevan costura: las separa el propio tono
  navy: "bg-navy text-paper",
};

type Props = {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
};

/** Banda full-bleed con riel interior (24 / 48 / 72px) y canvas máximo de 1440px. */
export function SectionBand({ id, tone = "paper", className = "", children }: Props) {
  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <div className="rail band-y">{children}</div>
    </section>
  );
}
