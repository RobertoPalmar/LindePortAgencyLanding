import { es } from "@/messages/es";
import { en } from "@/messages/en";

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export type Dictionary = typeof es;

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Locale contrario, para el toggle del header. */
export function otherLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}
