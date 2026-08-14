"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  /** recorta el bucle a los primeros N segundos (sin tocar el archivo) */
  clipSeconds?: number;
  /**
   * Imagen de respaldo. Se pinta como capa propia por encima del vídeo y se
   * retira cuando el vídeo ya tiene datos para reproducir.
   */
  poster?: string;
  /**
   * Pide el póster con prioridad alta. Solo sobre el pliegue: si no, compite
   * por red con el propio vídeo, que pesa mucho más y llega antes en el DOM.
   */
  posterPriority?: boolean;
  /**
   * Funde a transparente en la costura del bucle. Desactívalo con clips que ya
   * cierran donde abren: el fundido se nota más que el propio salto.
   */
  seamFade?: boolean;
  /** clases de filtro/encaje; el vídeo es decorativo y va a sangre */
  className?: string;
};

/** Segundos de fundido antes del salto de bucle. */
const FADE = 0.6;
/** Retirada del póster cuando el vídeo arranca: corta, solo para que no salte. */
const ENTER = 0.35;

/**
 * Vídeo de fondo en bucle, silenciado y decorativo.
 * - `poster` cubre la banda hasta que el vídeo puede reproducir, y sale cruzándose.
 * - `clipSeconds` limita el bucle a los primeros segundos del archivo.
 * - Con `seamFade`, funde a transparente en la costura del bucle y vuelve a entrar.
 * - Con `prefers-reduced-motion: reduce` se queda en el primer fotograma.
 *
 * El póster va por encima y se retira, en lugar de revelar el vídeo por debajo:
 * así la opacidad del vídeo queda libre para el fundido del bucle y las dos
 * transiciones no se pisan, cada una con su propia duración.
 */
export function BackgroundVideo({
  src,
  clipSeconds,
  poster,
  posterPriority = false,
  seamFade = true,
  className = "",
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  // Sin póster no hay nada que retirar.
  const [ready, setReady] = useState(!poster);

  useEffect(() => {
    const video = ref.current;
    if (!video || !poster) return;

    // Puede haber llegado a tener datos antes de que montáramos el listener.
    if (video.readyState >= 3) {
      setReady(true);
      return;
    }

    const onReady = () => setReady(true);
    video.addEventListener("canplay", onReady);
    return () => video.removeEventListener("canplay", onReady);
  }, [poster]);

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
          /* autoplay bloqueado: se queda el póster, o el primer fotograma */
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
      if (seamFade) {
        video.style.opacity = end - video.currentTime < FADE ? "0" : "1";
      }
    };

    apply();
    // Sin recorte ni fundido, el atributo `loop` nativo ya cierra el bucle solo.
    const needsTimeUpdate = seamFade || clipSeconds !== undefined;
    if (needsTimeUpdate) video.addEventListener("timeupdate", onTimeUpdate);
    mq.addEventListener("change", apply);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      mq.removeEventListener("change", apply);
    };
  }, [clipSeconds, seamFade]);

  return (
    <>
      <video
        ref={ref}
        src={src}
        poster={poster}
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
      {poster && (
        /* Mismas clases que el vídeo: durante el cruce las dos capas encajan igual */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          fetchPriority={posterPriority ? "high" : "auto"}
          style={{ opacity: ready ? 0 : 1, transition: `opacity ${ENTER}s ease-in-out` }}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${className}`}
        />
      )}
    </>
  );
}
