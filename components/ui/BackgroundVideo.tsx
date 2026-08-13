"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  /** recorta el bucle a los primeros N segundos (sin tocar el archivo) */
  clipSeconds?: number;
  /** clases de filtro/encaje; el vídeo es decorativo y va a sangre */
  className?: string;
};

/** Segundos de fundido antes del salto de bucle. */
const FADE = 0.6;

/**
 * Vídeo de fondo en bucle, silenciado y decorativo.
 * - `clipSeconds` limita el bucle a los primeros segundos del archivo.
 * - Funde a oscuro en la costura del bucle y vuelve a entrar, para que el salto no se note.
 * - Con `prefers-reduced-motion: reduce` se queda en el primer fotograma.
 */
export function BackgroundVideo({ src, clipSeconds, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      if (mq.matches) {
        video.pause();
        video.style.opacity = "1";
      } else {
        void video.play().catch(() => {
          /* autoplay bloqueado: se queda en el primer fotograma */
        });
      }
    };

    /** Fin efectivo del bucle: el recorte o la duración real, lo que sea menor. */
    const clipEnd = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : Infinity;
      return clipSeconds ? Math.min(clipSeconds, duration) : duration;
    };

    // El atributo `loop` no dispara `ended`, así que el bucle y el fundido van por tiempo.
    const onTimeUpdate = () => {
      if (mq.matches) return;
      const end = clipEnd();
      if (!Number.isFinite(end)) return;

      if (video.currentTime >= end) {
        video.currentTime = 0;
        return;
      }
      video.style.opacity = end - video.currentTime < FADE ? "0" : "1";
    };

    apply();
    video.addEventListener("timeupdate", onTimeUpdate);
    mq.addEventListener("change", apply);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      mq.removeEventListener("change", apply);
    };
  }, [clipSeconds]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      style={{ opacity: 1, transition: `opacity ${FADE}s ease-in-out` }}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}
