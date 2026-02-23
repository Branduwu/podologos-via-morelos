import { clinic } from "../config/clinic";
import { formatDateMX, sanitizePhone } from "./validation";

export type AppointmentMessageInput = {
  name: string;
  phone: string;
  service: string;
  selectedServices?: string[];
  approxTotal?: number;
  specialist?: string;
  date?: string;
  time?: string;
  shift?: string;
  notes?: string;
};

export type ContactMessageInput = {
  service?: string;
  reason?: string;
};

export function buildAppointmentMessage(data: AppointmentMessageInput): string {
  const specialist = data.specialist?.trim() || "Sin preferencia";
  const dateText = data.date ? formatDateMX(data.date) : "Por definir";
  const timeText = data.time || data.shift || "Por definir";
  const notes = data.notes?.trim() || "Sin notas";
  const selectedServices = (data.selectedServices || []).map((s) => s.trim()).filter(Boolean);
  const totalText =
    typeof data.approxTotal === "number" && data.approxTotal > 0
      ? new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(data.approxTotal)
      : null;
  const servicesBlock =
    selectedServices.length > 0
      ? ["Servicios solicitados:", ...selectedServices.map((service, idx) => `${idx + 1}. ${service}`)]
      : [];

  return [
    `Hola, quiero agendar una cita en ${clinic.name}.`,
    "",
    `Nombre: ${data.name.trim()}`,
    `Telefono: ${sanitizePhone(data.phone)}`,
    `Servicio: ${data.service.trim()}`,
    ...servicesBlock,
    ...(totalText ? [`Total aproximado: ${totalText}`] : []),
    `Especialista: ${specialist}`,
    `Fecha: ${dateText}`,
    `Hora/Turno: ${timeText}`,
    `Motivo/Notas: ${notes}`,
    "",
    "Me confirman disponibilidad, por favor?",
  ].join("\n");
}

export function buildContactMessage(data: ContactMessageInput): string {
  const service = data.service?.trim() || "General";
  const reason = data.reason?.trim() || "Quiero informacion y apoyo para agendar.";
  return [
    `Hola, quiero informacion en ${clinic.name}.`,
    `Servicio: ${service}`,
    `Motivo: ${reason}`,
  ].join("\n");
}

export function buildWhatsAppUrl(
  message: string,
  whatsappNumber: string = clinic.whatsappNumber
): string {
  const clean = sanitizePhone(whatsappNumber);
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}
