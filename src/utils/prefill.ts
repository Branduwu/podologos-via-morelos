export type AgendarPrefill = {
  service?: string;
  specialist?: string;
  services?: string[];
  approxTotal?: number;
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

  if (raw.startsWith("dent")) return "dentista";
  if (raw.startsWith("odont")) return "dentista";
  if (raw.startsWith("optometr")) return "optica";
  if (raw.startsWith("podolog")) return "podologia";
  if (raw.startsWith("psicolog")) return "psicologia";
  if (raw.startsWith("quiropr")) return "quiropractica";
  if (raw.includes("dent") || raw.includes("odont")) return "dentista";
  if (raw.includes("una") || raw.includes("callo") || raw.includes("pie")) return "podologia";
  if (raw.includes("ansiedad") || raw.includes("terapia")) return "psicologia";
  if (raw.includes("vista") || raw.includes("lente")) return "optica";
  if (raw.includes("espalda") || raw.includes("postura")) return "quiropractica";
  return raw;
}

export function getPrefillFromUrl(urlValue: string | URL): AgendarPrefill {
  const url = typeof urlValue === "string" ? new URL(urlValue, "https://dummy.local") : urlValue;
  const params = url.searchParams;
  const rawService = params.get("service") || params.get("servicio");
  const service = normalizeServiceSlug(rawService);
  const specialist = String(params.get("specialist") || "").trim();
  const servicesFromList = params.getAll("services");
  const servicesFromCsv = (params.get("servicios") || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
  const services = [...servicesFromList, ...servicesFromCsv]
    .map((v) => String(v || "").trim())
    .filter(Boolean);
  const approxTotalRaw = Number(params.get("approxTotal") || params.get("totalAprox") || "");
  const approxTotal = Number.isFinite(approxTotalRaw) && approxTotalRaw > 0 ? approxTotalRaw : undefined;
  const inferredService = service || normalizeServiceSlug(services[0] || rawService || "");

  return {
    service: inferredService || undefined,
    specialist: specialist || undefined,
    services: services.length > 0 ? services : undefined,
    approxTotal,
  };
}
