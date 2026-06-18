import { es } from "./es";
import { en } from "./en";

export type Locale = "es" | "en";

export const defaultLocale: Locale = "es";
export const locales: Locale[] = ["es", "en"];

const translations = { es, en } as const;

export function getLangFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split("/");
  if (first === "en") return "en";
  return "es";
}

export function useTranslations(lang: Locale) {
  return translations[lang];
}

/** Returns the equivalent path in the other locale. */
export function getAlternatePath(currentPath: string, targetLang: Locale): string {
  const isCurrentEn = currentPath.startsWith("/en/") || currentPath === "/en";
  if (targetLang === "en") {
    if (isCurrentEn) return currentPath;
    return "/en" + (currentPath === "/" ? "" : currentPath);
  }
  if (isCurrentEn) {
    const withoutEn = currentPath.replace(/^\/en/, "") || "/";
    return withoutEn;
  }
  return currentPath;
}

/** Returns <link rel="alternate"> data for both locales. */
export function getAlternateLinks(currentPath: string, siteUrl: string) {
  return locales.map((lang) => ({
    lang,
    href: siteUrl.replace(/\/$/, "") + getAlternatePath(currentPath, lang),
  }));
}
