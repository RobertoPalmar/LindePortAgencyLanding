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
- [ ] 12 huecos de imagen conectados a material real — **11 de 12**; falta el mockup del brochure
      (el hueco del hero está retirado por diseño).
- [ ] Correos, teléfono y dirección reales sustituyendo los "por confirmar".

### Desvíos deliberados respecto al prototipo

- **Galería**: el marco principal (STS) va en **vertical** (440×700, dos filas de 340px en vez de
  270px), porque la foto elegida es vertical. Los otros dos marcos se apilan al lado.
- **Launch**: en vez de la franja superior de foto, un **vídeo de fondo a sangre en toda la banda**
  (`saturate-150`) con velo navy al 88% para la legibilidad y el sello rojo `24 / 7 / 365` arriba a
  la derecha. Funde a oscuro en la costura del bucle y se queda en el primer fotograma con
  `prefers-reduced-motion`. `BackgroundVideo` acepta `clipSeconds` para recortar el bucle a los
  primeros N segundos sin tocar el archivo.
- **Agencia (01)**: rediseñada respecto al prototipo para que no quede vacía — filete rojo + eyebrow,
  índices mono rojos `01–10` en la lista (mismo patrón que las tarjetas de marinos), filas con hover
  y una **hélice de línea** (`PropellerMark`) llenando la esquina inferior derecha.
- **Contacto**: la decoración es un **ancla de línea** en lugar de la retícula de carta náutica.
  Nota: el README de marca prohíbe explícitamente anclas y timones — cambio pedido por el cliente.
- **Header**: por debajo de 640px el CTA rojo vive dentro del menú full-screen (en el prototipo,
  de ancho fijo 1440, no existe este caso).

## Pendiente (necesita material del cliente)

1. **Mockup del brochure**: único hueco sin material. Se pinta con marco `#F2F1EC` y una referencia
   mono; nunca stock genérico. Ya conectados: agencia, vídeo de launch, las 3 de galería y los
   5 puertos (`public/photos/`). Las fotos no asignadas están en `design-assets/photos/`, fuera de
   `public/`, para no desplegar peso muerto.
2. **Comprimir `public/photos/launch/launch.mp4`** (8,5 MB). Recomendado: H.264 ~1280px, CRF 28,
   sin audio, y un `poster` extraído del primer fotograma (`preload="metadata"` ya está puesto).
   El material de origen sin usar vive en `design-assets/`; `design-assets/video/` está en
   `.gitignore` porque `launch service.mp4` pesa 101 MB y GitHub rechaza archivos de más de 100 MB.
3. **PDFs del brochure**: `public/brochure/linde-brochure-es.pdf` y `-en.pdf` (los enlaces existen).
4. **Datos de contacto reales** en `messages/*.ts` (`contact.blocks`) y en el `contactPoint` /
   `address` del JSON-LD.
5. **Envío del formulario**: [app/[locale]/actions.ts](app/[locale]/actions.ts) valida y registra en
   consola; falta conectar al correo de la mesa de operaciones + copia a cotizaciones (pendientes
   de confirmar) o al CRM.
6. **Favicon e imagen OG**: hoy el favicon apunta al logo vertical; el `ship-favicon.svg` del
   proyecto de marca y `public/og/linde-og.jpg` están pendientes.
7. **Dominio** en `metadataBase` (hoy `https://lindeportagency.com`).
