import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** rojo sobre fondo claro, rosa sobre navy */
  tone?: "red" | "pink";
  className?: string;
};

export function Eyebrow({ children, tone = "red", className = "" }: Props) {
  return (
    <div
      className={`mono text-[12px] tracking-[0.2em] ${
        tone === "red" ? "text-red" : "text-pink"
      } ${className}`}
    >
      {children}
    </div>
  );
}
