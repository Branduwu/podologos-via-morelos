/**
 * Strips accents, lowercases and trims a raw category string.
 * Used as a lookup key against CATEGORY_LABELS.
 */
export function normalizeCategory(raw: string | null | undefined): string {
  return String(raw ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/** Canonical display labels for every service category (Spanish). */
export const CATEGORY_LABELS: Record<string, string> = {
  roedores:   "Roedores",
  cucarachas: "Cucarachas",
  termitas:   "Termitas",
  chinches:   "Chinches de cama",
  hormigas:   "Hormigas",
  avispas:    "Avispas y abejas",
  inspeccion: "Inspeccion",
  general:    "Fumigacion general",
  fumigacion: "Fumigacion general",
  otros:      "Otros",
};

/** Canonical display labels for every service category (English). */
export const CATEGORY_LABELS_EN: Record<string, string> = {
  roedores:   "Rodents",
  cucarachas: "Cockroaches",
  termitas:   "Termites",
  chinches:   "Bed Bugs",
  hormigas:   "Ants",
  avispas:    "Wasps & Bees",
  inspeccion: "Inspection",
  general:    "General Fumigation",
  fumigacion: "General Fumigation",
  otros:      "Other",
};

/** Returns the Spanish display label for a raw category string. */
export function getCategoryLabel(
  raw: string | null | undefined,
  fallback = "General"
): string {
  return CATEGORY_LABELS[normalizeCategory(raw)] ?? fallback;
}

/** Returns the English display label for a raw category string. */
export function getCategoryLabelEn(
  raw: string | null | undefined,
  fallback = "General"
): string {
  return CATEGORY_LABELS_EN[normalizeCategory(raw)] ?? fallback;
}

/** Returns the label in the given locale. */
export function getCategoryLabelByLocale(
  raw: string | null | undefined,
  locale: "es" | "en",
  fallback = "General"
): string {
  return locale === "en"
    ? getCategoryLabelEn(raw, fallback)
    : getCategoryLabel(raw, fallback);
}
