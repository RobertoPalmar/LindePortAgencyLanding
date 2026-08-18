import type { Dictionary } from "@/lib/i18n";
import { SectionBand } from "@/components/ui/SectionBand";
import { ImageFrame } from "@/components/ui/ImageFrame";

/**
 * Galería "Operaciones en curso".
 * El marco principal (STS) va en vertical: 440×700 con los dos marcos apilados al lado.
 */
export function GallerySection({ d }: { d: Dictionary }) {
  const [gal1, gal2, gal3] = d.gallery.items;

  return (
    <SectionBand tone="paper">
      <div className="mb-[30px] flex items-end justify-between">
        <h2 className="m-0 text-[26px] font-bold tracking-[-0.015em] lg:text-[34px]">
          {d.gallery.title}
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-[440px_1fr] lg:grid-rows-[340px_340px]">
        <div className="relative aspect-[3/4] overflow-hidden bg-panel-2 lg:row-span-2 lg:aspect-auto">
          <ImageFrame
            src="/photos/gallery/sts-v2.jpg"
            alt={gal1}
            sizes="(max-width: 1023px) 100vw, 440px"
            fillParent
          />
          <div className="pointer-events-none absolute bottom-0 left-0 flex items-center gap-[14px] bg-navy px-6 py-4 text-paper">
            <span className="mono text-[11px] tracking-[0.18em] text-pink">01</span>
            <span className="text-[16px] font-semibold tracking-[-0.01em]">{gal1}</span>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 h-[76px] w-1 bg-red"
          />
        </div>

        <SmallFrame index="02" title={gal2} src="/photos/gallery/underwater.jpg" />
        <SmallFrame index="03" title={gal3} src="/photos/gallery/panama-canal.jpg" />
      </div>
    </SectionBand>
  );
}

function SmallFrame({ index, title, src }: { index: string; title: string; src?: string }) {
  return (
    <div className="relative min-h-[240px] overflow-hidden bg-panel-2 lg:min-h-0">
      <ImageFrame
        src={src}
        alt={title}
        placeholder={title.toUpperCase()}
        sizes="(max-width: 1023px) 100vw, 840px"
        fillParent
      />
      <div className="pointer-events-none absolute bottom-0 left-0 flex items-center gap-[14px] bg-navy px-5 py-[13px] text-paper">
        <span className="mono text-[11px] tracking-[0.18em] text-pink">{index}</span>
        <span className="text-[15px] font-semibold tracking-[-0.01em]">{title}</span>
      </div>
    </div>
  );
}
