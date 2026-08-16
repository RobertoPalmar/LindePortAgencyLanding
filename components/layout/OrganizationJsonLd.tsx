import type { Locale } from "@/lib/i18n";
import { portNames } from "@/lib/ports";
import { CONTACT } from "@/lib/contact";

/**
 * JSON-LD de Organization.
 *
 * Sin `address`: la agencia opera en red por el Caribe y Panamá, no desde una
 * oficina principal. El contacto es el teléfono y el correo de la mesa, y el
 * territorio lo declara `areaServed`.
 */
export function OrganizationJsonLd({ locale, description }: { locale: Locale; description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Linde Port Agency",
    url: `https://lindeportagency.com/${locale}`,
    logo: "https://lindeportagency.com/brand/linde-logo.svg",
    description,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    // La mesa atiende todo el año: `contactType` es el vocabulario que Google lee
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: CONTACT.phone,
      email: CONTACT.email,
      availableLanguage: ["es", "en"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    },
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
