import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";

import { Hero } from "@/components/sections/Hero";
import { StatsBand } from "@/components/sections/StatsBand";
import { AgencySection } from "@/components/sections/AgencySection";
import { LaunchSection } from "@/components/sections/LaunchSection";
import { PortCallSection } from "@/components/sections/PortCallSection";
import { MarineSection } from "@/components/sections/MarineSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { PortsSection } from "@/components/sections/PortsSection";
import { BrochureSection } from "@/components/sections/BrochureSection";
import { ContactSection } from "@/components/sections/ContactSection";

// Cloudflare Pages ejecuta las rutas en el runtime edge; sin esto, el Server
// Action del formulario de contacto no tiene dónde correr y el build del
// adaptador falla.
export const runtime = "edge";

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const d = getDictionary(params.locale);

  return (
    <main>
      {/* Alternancia de bandas: nunca dos navy seguidas. */}
      <Hero d={d} />
      <StatsBand d={d} />
      <AgencySection d={d} />
      <LaunchSection d={d} />
      <PortCallSection d={d} />
      <MarineSection d={d} />
      <GallerySection d={d} />
      <PortsSection d={d} />
      <BrochureSection d={d} />
      <ContactSection d={d} />
    </main>
  );
}
