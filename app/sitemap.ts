import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const SITE = "https://lindeportagency.com";

/**
 * Una entrada por idioma, cada una declarando la otra.
 *
 * La raíz no se lista: es una redirección del middleware, y un sitemap que
 * apunta a redirecciones gasta presupuesto de rastreo sin indexar nada.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${SITE}/${l}`]));

  return locales.map((locale) => ({
    url: `${SITE}/${locale}`,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
