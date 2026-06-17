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

/** Canonical display labels for every service category used across the site. */
export const CATEGORY_LABELS: Record<string, string> = {
  podologia: "Podologia",
  psicologia: "Psicologia",
  optica: "Optica",
  quiropractica: "Quiropractica",
  dentista: "Dentista",
  instalaciones: "Instalaciones",
  general: "General",
  otros: "Otros",
};

/** Returns the display label for a raw category string, with an optional fallback. */
export function getCategoryLabel(
  raw: string | null | undefined,
  fallback = "General"
): string {
  return CATEGORY_LABELS[normalizeCategory(raw)] ?? fallback;
}
