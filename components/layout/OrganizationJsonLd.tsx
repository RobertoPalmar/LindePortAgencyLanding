import type { Locale } from "@/lib/i18n";
import { portNames } from "@/lib/ports";

/**
 * JSON-LD de Organization con los datos ya confirmados.
 * Pendiente: email, teléfono y dirección postal reales (`contactPoint` / `address`).
 */
export function OrganizationJsonLd({ locale, description }: { locale: Locale; description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Linde Port Agency",
    url: `https://lindeportagency.com/${locale}`,
    logo: "https://lindeportagency.com/brand/linde-logo.svg",
    description,
    areaServed: portNames.map((name) => ({ "@type": "Country", name })),
    knowsLanguage: ["es", "en"],
  };

  return (
    <script
      type="application/ld+json"
      // el objeto es estático y propio: no hay entrada de usuario que escapar
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
