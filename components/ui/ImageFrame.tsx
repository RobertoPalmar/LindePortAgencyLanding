import Image from "next/image";
import type { CSSProperties } from "react";

type Props = {
  src?: string;
  /** segunda foto que sustituye a `src` en hover, con fundido cruzado */
  hoverSrc?: string;
  alt: string;
  /** texto mono de referencia mientras no llega la foto real */
  placeholder?: string;
  sizes?: string;
  priority?: boolean;
  /** ocupa todo el contenedor padre (que debe ser `relative` y tener alto) */
  fillParent?: boolean;
  className?: string;
  style?: CSSProperties;
  /** tono del marco: panel-2 sobre claro, navy-2 dentro de zonas navy */
  frame?: "panel" | "panel2" | "navy";
};

const frames = {
  panel: "bg-panel",
  panel2: "bg-panel-2",
  navy: "bg-navy-2",
};

/**
 * Marco de imagen del diseño: fondo de marco + object-cover.
 * Sin `src` deja el marco vacío con la referencia mono (nunca stock genérico).
 */
export function ImageFrame({
  src,
  hoverSrc,
  alt,
  placeholder,
  sizes = "100vw",
  priority = false,
  fillParent = false,
  className = "",
  style,
  frame = "panel2",
}: Props) {
  // `position` en una sola clase: mezclar `relative` y `absolute` deja el marco a 0 de alto.
  const position = fillParent ? "absolute inset-0" : "relative";

  return (
    <div className={`group ${position} overflow-hidden ${frames[frame]} ${className}`} style={style}>
      {src ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`object-cover transition-[transform,opacity] duration-[0.6s] ease-out group-hover:scale-[1.06] ${
              hoverSrc ? "group-hover:opacity-0" : ""
            }`}
          />
          {hoverSrc ? (
            // decorativa: el alt lo pone la de abajo, que es la que se lee siempre
            <Image
              src={hoverSrc}
              alt=""
              aria-hidden="true"
              fill
              sizes={sizes}
              className="object-cover opacity-0 transition-[transform,opacity] duration-[0.6s] ease-out group-hover:scale-[1.06] group-hover:opacity-100"
            />
          ) : null}
        </>
      ) : (
        // arriba a la izquierda: las placas de rótulo van abajo y taparían el texto
        <div className="absolute inset-0 flex items-start p-6">
          <span
            className={`mono text-[10.5px] tracking-[0.16em] ${
              frame === "navy" ? "text-ink-muteDark" : "text-ink-mute"
            }`}
          >
            {placeholder ?? alt}
          </span>
        </div>
      )}
    </div>
  );
}
