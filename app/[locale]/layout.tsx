import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "../globals.css";

import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { StatusBar } from "@/components/layout/StatusBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationJsonLd } from "@/components/layout/OrganizationJsonLd";
import { BackToTop } from "@/components/ui/BackToTop";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : "es";
  const d = getDictionary(locale);

  return {
    title: d.meta.title,
    description: d.meta.description,
    metadataBase: new URL("https://lindeportagency.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: { es: "/es", en: "/en" },
    },
    openGraph: {
      type: "website",
      title: d.meta.title,
      description: d.meta.description,
      locale,
      images: ["/og/linde-og.jpg"],
    },
    // Provisional: el `ship-favicon.svg` del proyecto de marca está pendiente de entrega.
    icons: { icon: [{ url: "/brand/linde-logo.svg", type: "image/svg+xml" }] },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const d = getDictionary(locale);

  return (
    <html lang={locale} className={`${archivo.variable} ${plexMono.variable}`}>
      <body className="font-sans">
        <OrganizationJsonLd locale={locale} description={d.meta.description} />
        <StatusBar d={d} />
        <Header d={d} locale={locale} />
        {children}
        <Footer d={d} />
        <BackToTop label={d.nav.backToTop} />
      </body>
    </html>
  );
}
