import { business } from "../config/clinic";
import { formatDateMX, sanitizePhone } from "./validation";

export type AppointmentMessageInput = {
  name: string;
  phone: string;
  service: string;
  introMessage?: string;
  selectedServices?: string[];
  serviceSpecialists?: Array<{ service: string; specialist: string }>;
  approxTotal?: number;
  specialist?: string;
  date?: string;
  time?: string;
  shift?: string;
  notes?: string;
};

export type ContactMessageInput = {
  introMessage?: string;
  service?: string;
  reason?: string;
};

export type WhatsAppTemplateValues = {
  specialist?: string;
  service?: string;
  business?: string;
  problem?: string;
};

const normalizeMessage = (value: string) =>
  String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();

const normalizeBaseText = (value: string) =>
  String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export function sanitizeDirectReason(reason?: string): string {
  const raw = String(reason || "").trim();
  if (!raw) return "Me gustaría solicitar un servicio de fumigación y saber más de sus precios.";

  const normalized = normalizeBaseText(raw);
  const hasNamePlaceholder =
    normalized.includes("hola soy") ||
    normalized.includes("mi nombre es") ||
    normalized.includes("[nombre") ||
    normalized.includes("{nombre") ||
    normalized.includes("<nombre") ||
    normalized.includes("tu nombre");

  if (hasNamePlaceholder) {
    return "Me gustaría solicitar un servicio de fumigación y saber más de sus precios.";
  }

  return raw;
}

function applyTemplate(
  template: string,
  values: WhatsAppTemplateValues = {}
): string {
  let output = String(template || "");
  const fallbackBusiness = String(values.business || business.name || "nuestro negocio").trim();
  const replacements: Record<string, string> = {
    especialista: String(values.specialist || "este técnico").trim(),
    servicio: String(values.service || "General").trim(),
    negocio: fallbackBusiness,
    problema: String(values.problem || "").trim(),
  };

  Object.entries(replacements).forEach(([key, value]) => {
    output = output.split(`{${key}}`).join(value);
  });

  // Compatibilidad: si el editor usa "___" en lugar de {problema}, lo rellenamos igual.
  output = output.replace(/_{2,}/g, replacements.problema);

  // Limpia espacios, puntuación y preposiciones huérfanas de placeholders vacíos
  output = output
    .replace(/\s+([.,!?])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .replace(/\b(en|con|de|para|por)\s*[.,!?]?\s*$/i, "")
    .trim();
  if (output && !/[.,!?]$/.test(output)) output += ".";

  return output;
}

function isLikelyFullMessage(text: string): boolean {
  const normalized = normalizeBaseText(text);
  if (!normalized) return false;
  if (text.includes("\n")) return true;
  if (normalized.startsWith("hola")) return true;
  if (normalized.startsWith("buen dia")) return true;
  if (normalized.startsWith("buenas")) return true;
  return false;
}

export function resolveWhatsAppReason(
  template: string | null | undefined,
  fallback: string,
  values: WhatsAppTemplateValues = {}
): string {
  const resolvedTemplate = applyTemplate(String(template || ""), values);
  if (resolvedTemplate) return sanitizeDirectReason(resolvedTemplate);
  return sanitizeDirectReason(applyTemplate(fallback, values));
}

export function resolveWhatsAppNumber(
  ...numbers: Array<string | null | undefined>
): string {
  for (const number of numbers) {
    const clean = sanitizePhone(String(number || ""));
    if (clean.length >= 10 && clean.length <= 15) return clean;
  }
  return "";
}

export function buildAppointmentMessage(data: AppointmentMessageInput): string {
  const intro =
    data.introMessage && String(data.introMessage).trim()
      ? sanitizeDirectReason(data.introMessage)
      : `Hola, quiero solicitar un servicio de fumigacion en ${business.name}.`;
  const specialist = data.specialist?.trim() || "Sin preferencia";
  const dateText = data.date ? formatDateMX(data.date) : "Por definir";
  const timeText = data.time || data.shift || "Por definir";
  const notes = data.notes?.trim() || "Sin notas";
  const selectedServices = (data.selectedServices || []).map((s) => s.trim()).filter(Boolean);
  const totalText =
    typeof data.approxTotal === "number" && data.approxTotal > 0
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(data.approxTotal)
      : null;
  const servicesBlock =
    selectedServices.length > 0
      ? ["Servicios solicitados:", ...selectedServices.map((service, idx) => `${idx + 1}. ${service}`)]
      : [];
  const serviceSpecialists = (data.serviceSpecialists || [])
    .map((item) => ({
      service: String(item?.service || "").trim(),
      specialist: String(item?.specialist || "").trim(),
    }))
    .filter((item) => item.service && item.specialist);
  const specialistsBlock =
    serviceSpecialists.length > 0
      ? [
          "Técnicos por servicio:",
          ...serviceSpecialists.map(
            (item, idx) => `${idx + 1}. ${item.service} -> ${item.specialist}`
          ),
        ]
      : [];

  return [
    intro,
    "",
    `Nombre: ${data.name.trim()}`,
    `Telefono: ${sanitizePhone(data.phone)}`,
    `Servicio: ${data.service.trim()}`,
    ...servicesBlock,
    ...specialistsBlock,
    ...(totalText ? [`Total aproximado: ${totalText}`] : []),
    `Técnico: ${specialist}`,
    `Fecha: ${dateText}`,
    `Hora/Turno: ${timeText}`,
    `Motivo/Notas: ${notes}`,
    "",
    "Me confirman disponibilidad, por favor?",
  ].join("\n");
}

export function buildContactMessage(data: ContactMessageInput): string {
  const service = data.service?.trim() || "";
  const reason = normalizeMessage(sanitizeDirectReason(data.reason));

  // Si el mensaje ya es un saludo completo, se envía tal cual.
  if (reason && isLikelyFullMessage(reason)) {
    return reason;
  }

  const intro =
    data.introMessage && String(data.introMessage).trim()
      ? sanitizeDirectReason(data.introMessage)
      : `Hola, me gustaria solicitar un servicio de fumigacion en ${business.name}.`;

  const lines = [intro];
  if (service && service.toLowerCase() !== "general") {
    lines.push(`Servicio: ${service}`);
  }
  if (reason) {
    lines.push(reason);
  }

  return lines.join("\n");
}

export function buildWhatsAppUrl(
  message: string,
  whatsappNumber: string = business.whatsappNumber
): string {
  const clean = sanitizePhone(whatsappNumber);
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}
