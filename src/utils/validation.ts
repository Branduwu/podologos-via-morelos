import { clinic, type DayKey } from "../config/clinic";

const DAY_KEYS: DayKey[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function sanitizePhone(input: string): string {
  return String(input || "").replace(/\D/g, "");
}

export function isValidPhone(digits: string): boolean {
  const clean = sanitizePhone(digits);
  return clean.length >= 10 && clean.length <= 15;
}

export function isValidPhoneInput(raw: string): boolean {
  const value = String(raw || "").trim();
  if (!value) return false;
  const allowedChars = /^[\d\s()+-]+$/;
  if (!allowedChars.test(value)) return false;
  return isValidPhone(value);
}

export function formatDateMX(dateValue: string | Date | null | undefined): string {
  if (!dateValue) return "Por definir";
  const date = typeof dateValue === "string" ? new Date(`${dateValue}T12:00:00`) : dateValue;
  if (Number.isNaN(date.getTime())) return "Por definir";
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function isSunday(dateValue: string | Date | null | undefined): boolean {
  if (!dateValue) return false;
  const date = typeof dateValue === "string" ? new Date(`${dateValue}T12:00:00`) : dateValue;
  if (Number.isNaN(date.getTime())) return false;
  return date.getDay() === 0;
}

export function isWithinSchedule(dateValue: string, timeValue: string): boolean {
  if (!dateValue || !timeValue) return true;
  const date = new Date(`${dateValue}T12:00:00`);
  if (Number.isNaN(date.getTime())) return false;

  const dayKey = DAY_KEYS[date.getDay()];
  const daySchedule = clinic.schedule[dayKey];
  if (!daySchedule || daySchedule.closed || !daySchedule.open || !daySchedule.close) return false;

  const [h, m] = timeValue.split(":").map((p) => Number(p));
  if (Number.isNaN(h) || Number.isNaN(m)) return false;
  const minutes = h * 60 + m;

  const [openH, openM] = daySchedule.open.split(":").map((p) => Number(p));
  const [closeH, closeM] = daySchedule.close.split(":").map((p) => Number(p));
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  return minutes >= openMinutes && minutes <= closeMinutes;
}
