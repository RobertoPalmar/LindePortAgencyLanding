# Linde Port Agency — sitio corporativo

Sitio one-page bilingüe (ES/EN) implementado desde el handoff de diseño
`design_handoff_linde_web` (README + Apéndice A de Next.js + prototipo `Linde Web.dc.html`).

## Stack

- Next.js 14 (App Router) · React 18 · TypeScript
- Tailwind CSS con los tokens de marca en [tailwind.config.ts](tailwind.config.ts)
- `next/font` (Archivo + IBM Plex Mono, auto-hospedadas) y `next/image`
- Zod + Server Action para el formulario de contacto

```bash
npm install
npm run dev     # http://localhost:3000 → redirige a /es
npm run build
npm run lint
```

## Estructura

```
app/[locale]/layout.tsx    html lang, fuentes, metadata, StatusBar + Header + Footer, JSON-LD
app/[locale]/page.tsx      compone las 13 bandas en orden
app/[locale]/actions.ts    Server Action del formulario (Zod + honeypot)
app/globals.css            reset, riel responsive, prefers-reduced-motion, .field
components/layout/         StatusBar · Header · Footer · OrganizationJsonLd
components/sections/       las 10 bandas de contenido
components/ui/             SectionBand · SectionHeader · Eyebrow · LineIcon · ImageFrame
lib/i18n.ts                locales, diccionarios, otherLocale
lib/ports.ts               nombres y fotos de los 5 puertos
lib/contact.ts             teléfono y correo: fuente única, no se traducen
lib/scroll.ts              subida al inicio (logo del header y BackToTop)
messages/es.ts · en.ts     todos los copys ES/EN (arrays de contenido incluidos)
middleware.ts              negociación de locale (/ → /es)
public/brand · photos · brochure · og
```

### i18n

En vez de `next-intl` se usa un **diccionario tipado** (`messages/es.ts` es la fuente de la
verdad; `en.ts` se declara como `Dictionary`, así el compilador exige paridad de claves). Las
rutas son `/es` y `/en`, `es` por defecto, y el toggle del header es un `<Link>` al otro locale.
Menos dependencias y tipado completo de los arrays de contenido; si más adelante se necesita
routing i18n avanzado, migrar a `next-intl` es un cambio localizado en `lib/i18n.ts` y el layout.

### Server vs Client

Client solo donde hay estado o eventos: `Header` (menú + scroll-spy), `StatsBand` (contador),
`PortsSection` (riel), `BrochureSection` (desplegable) y `ContactSection` (formulario).
Escala (03) y marinos (04) resuelven el hover con `group-hover` y se quedan en server, como
recomienda el apéndice.

### Responsive

El prototipo es un canvas fijo de 1440px. Aquí las bandas son full-bleed con riel interior por
variable CSS `--rail`: 24px (móvil) · 48px (≥1024) · 72px (≥1280), y `.band-y` pasa de 64/72 a
96/104. Sin radios, sombras ni degradados nuevos.

## Paridad con el handoff

- [x] Riel respetado en todas las bandas; canvas máximo 1440px.
- [x] Alternancia crema/blanco intacta; sin dos navy seguidas (franja separadora de 88px antes de Launch).
- [x] Radio 0; sombras solo en hover de CTA y en el desplegable del brochure.
- [x] Rojo `#C8102E` como único acento; mono siempre en mayúsculas con su tracking.
- [x] Escala y marinos con color visible **sin** hover.
- [x] Olas a 16s, dot de la barra de estado pulsando, entrada del hero.
- [x] `prefers-reduced-motion` (incluido el contador de cifras) y `:focus-visible`.
- [x] `aria-current` en el ancla activa, `role="menu"`/`aria-expanded` en el desplegable.
- [x] 12 huecos de imagen conectados a material real (el hueco del hero está retirado por diseño).
      El marco del brochure lleva dos: portada cerrada y, en hover, el mockup abierto.
- [x] Datos de contacto reales: teléfono y correo en [lib/contact.ts](lib/contact.ts). Sin dirección
      postal por decisión de negocio — la agencia opera en red, no desde una oficina principal.

### Desvíos deliberados respecto al prototipo

- **Galería**: el marco principal (STS) va en **vertical** (440×700, dos filas de 340px en vez de
  270px). Los otros dos marcos se apilan al lado. La foto de STS es apaisada y `object-cover` la
  recorta al centro: la composición aguanta porque los dos cascos convergen hacia el horizonte y
  la franja central sigue leyéndose como buque a buque. Si se cambia por otra apaisada, hay que
  mirar el recorte antes de darla por buena.
- **Launch**: en vez de la franja superior de foto, un **vídeo de fondo a sangre en toda la banda**
  (`saturate-150`) con velo navy al 88% para la legibilidad y el sello rojo `24 / 7 / 365` arriba a
  la derecha. Funde a oscuro en la costura del bucle y se queda en el primer fotograma con
  `prefers-reduced-motion`. `BackgroundVideo` acepta `clipSeconds` para recortar el bucle a los
  primeros N segundos sin tocar el archivo.
- **Agencia (01)**: rediseñada respecto al prototipo para que no quede vacía — filete rojo + eyebrow,
  tirador rojo sobre la foto, índices mono rojos `01–10` en la lista (mismo patrón que las tarjetas
  de marinos), filas con hover, un bloque de cierre con los 5 puertos bajo el rótulo `COBERTURA`, y
  un **salvavidas de línea** (`LifebuoyMark`) llenando la esquina inferior derecha.
- **Contacto**: la decoración es un **ancla de línea** en lugar de la retícula de carta náutica.
  Nota: el README de marca prohíbe explícitamente anclas y timones — cambio pedido por el cliente.
- **Header**: por debajo de 640px el CTA rojo vive dentro del menú full-screen (en el prototipo,
  de ancho fijo 1440, no existe este caso).

## Pendiente (necesita material del cliente)

1. **Imagen de Open Graph**: `app/[locale]/layout.tsx` declara `/og/linde-og.jpg`, pero el archivo
   no existe, así que las vistas previas al compartir el enlace salen sin imagen. Hace falta un
   1200×630. Es el único hueco de material que queda: ya están conectados agencia, brochure, las 3
   de galería y los 5 puertos (`public/photos/`), más los 3 vídeos (`public/video/`). Las fotos no
   asignadas viven en `design-assets/photos/`, fuera de `public/`, para no desplegar peso muerto.
2. **Afinar los vídeos.** Viven en `public/video/` y se llaman por la sección que los consume:
   `hero.mp4` (17 MB), `agency.mp4` (sección 01, 6,0 MB) y `launch.mp4` (sección 02,
   1280×720 · 21,6 s · 23,3 MB). `hero.mp4` y `launch.mp4` pesan de más para autoplay: el de Launch
   va a ~8,6 Mbps y baja a ~3 MB sin pérdida visible, y el del hero es el peor caso porque bloquea
   la primera pantalla. Para ambos:
   `ffmpeg -i entrada.mp4 -an -vf scale=1280:-2 -c:v libx264 -crf 28 -movflags +faststart salida.mp4`.
   Los tres ya están en faststart (`moov` al principio) y van con `preload="auto"`: Safari se queda
   en `readyState 1` con `metadata` y nunca llega a reproducir. Falta el `poster` de Launch; el del
   hero es el primer fotograma del propio vídeo —si cambia `hero.mp4`, hay que regenerarlo con
   `ffmpeg -i public/video/hero.mp4 -vframes 1 -q:v 3 public/photos/hero/hero-poster.jpg -y`— y la
   sección 01 usa `agency-vertical.jpg`.
   El material de origen sin usar vive en `design-assets/` (la carpeta `video/` está ignorada).
3. **Envío del formulario**: [app/[locale]/actions.ts](app/[locale]/actions.ts) valida y registra en
   consola; falta el proveedor de correo para enviar a `CONTACT.email`, o la conexión al CRM.
4. **Favicon e imagen OG**: hoy el favicon apunta al logo vertical; el `ship-favicon.svg` del
   proyecto de marca y `public/og/linde-og.jpg` están pendientes.
5. **Dominio** en `metadataBase` (hoy `https://lindeportagency.com`).
