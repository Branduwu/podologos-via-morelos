export type AgendarPrefill = {
  service?: string;
  specialist?: string;
  services?: string[];
  priceIds?: string[];
  specialists?: string[];
  waNumber?: string;
  waMessage?: string;
  waNumbers?: string[];
  waMessages?: string[];
  approxTotal?: number;
  routing?: "general";
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

  const hasRataWord = /(^|-)(rata|raton)($|-)/.test(raw);
  if (raw.startsWith("roed") || hasRataWord) return "roedores";
  if (raw.startsWith("cucar")) return "cucarachas";
  if (raw.startsWith("termit")) return "termitas";
  if (raw.startsWith("chinch")) return "chinches";
  if (raw.startsWith("hormig")) return "hormigas";
  if (raw.startsWith("avispa") || raw.startsWith("abeja")) return "avispas";
  if (raw.startsWith("inspec")) return "inspeccion";
  if (raw.includes("roed") || hasRataWord) return "roedores";
  if (raw.includes("cucar")) return "cucarachas";
  if (raw.includes("termit")) return "termitas";
  if (raw.includes("chinch")) return "chinches";
  if (raw.includes("hormig")) return "hormigas";
  if (raw.includes("avispa") || raw.includes("abeja")) return "avispas";
  if (raw.includes("inspec") || raw.includes("revision")) return "inspeccion";
  return raw;
}

export function getPrefillFromUrl(urlValue: string | URL): AgendarPrefill {
  const url = typeof urlValue === "string" ? new URL(urlValue, "https://dummy.local") : urlValue;
  const params = url.searchParams;
  const noneSpecialistValue = "__none__";
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
  const priceIds = [
    ...params.getAll("priceIds"),
    ...params.getAll("priceId"),
  ]
    .map((value) => String(value || "").trim())
    .filter(Boolean);
  const specialistsFromList = params
    .getAll("specialists")
    .map((value) => String(value || "").trim())
    .map((value) => (value === noneSpecialistValue ? "" : value));
  const specialists = specialistsFromList.length > 0 ? specialistsFromList : undefined;
  const waNumber = String(params.get("waNumber") || "").trim();
  const waMessage = String(params.get("waMessage") || "").trim();
  const waNumbers = params
    .getAll("waNumbers")
    .map((value) => String(value || "").trim())
    .map((value) => (value === noneSpecialistValue ? "" : value));
  const waMessages = params
    .getAll("waMessages")
    .map((value) => String(value || "").trim())
    .map((value) => (value === noneSpecialistValue ? "" : value));
  const routingRaw = String(params.get("routing") || "").trim().toLowerCase();
  const routing = routingRaw === "general" ? "general" : undefined;
  const approxTotalRaw = Number(params.get("approxTotal") || params.get("totalAprox") || "");
  const approxTotal = Number.isFinite(approxTotalRaw) && approxTotalRaw > 0 ? approxTotalRaw : undefined;
  const inferredService = service || normalizeServiceSlug(services[0] || rawService || "");

  return {
    service: inferredService || undefined,
    specialist: specialist || undefined,
    services: services.length > 0 ? services : undefined,
    priceIds: priceIds.length > 0 ? priceIds : undefined,
    specialists,
    waNumber: waNumber || undefined,
    waMessage: waMessage || undefined,
    waNumbers: waNumbers.length > 0 ? waNumbers : undefined,
    waMessages: waMessages.length > 0 ? waMessages : undefined,
    approxTotal,
    routing,
  };
}
