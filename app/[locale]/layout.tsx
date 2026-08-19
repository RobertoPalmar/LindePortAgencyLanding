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
      // `x-default` es el destino para un idioma que no es ninguno de los dos;
      // sin él Google elige por su cuenta cuál mostrar.
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: "Linde Port Agency",
      title: d.meta.title,
      description: d.meta.description,
      locale: locale === "es" ? "es_ES" : "en_US",
      images: [{ url: "/og/linde-og.jpg", width: 1200, height: 630, alt: d.meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: d.meta.title,
      description: d.meta.description,
      images: ["/og/linde-og.jpg"],
    },
    // `max-image-preview:large` es lo que permite la miniatura grande en
    // resultados y en Discover; por defecto Google recorta a una en miniatura.
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    // Recortados al barco de la marca: el lockup completo, con el texto, es una
    // mancha ilegible en una pestaña de 16px.
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/brand/favicon-32.png", type: "image/png", sizes: "32x32" },
        { url: "/brand/favicon-512.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
    },
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
