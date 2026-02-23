export type AgendarPrefill = {
  service?: string;
  specialist?: string;
};

function normalizeSlug(value: string | null | undefined): string {
  return String(value || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeServiceSlug(value: string | null | undefined): string {
  const raw = normalizeSlug(value);

  if (raw.startsWith("optometr")) return "optica";
  if (raw.startsWith("podolog")) return "podologia";
  if (raw.startsWith("psicolog")) return "psicologia";
  if (raw.startsWith("quiropr")) return "quiropractica";
  return raw;
}

export function getPrefillFromUrl(urlValue: string | URL): AgendarPrefill {
  const url = typeof urlValue === "string" ? new URL(urlValue, "https://dummy.local") : urlValue;
  const params = url.searchParams;
  const service = normalizeServiceSlug(params.get("service") || params.get("servicio"));
  const specialist = normalizeSlug(params.get("specialist"));

  return {
    service: service || undefined,
    specialist: specialist || undefined,
  };
}
