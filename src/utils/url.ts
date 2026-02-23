export function safeCmsUrl(value: string | null | undefined, fallback = ""): string {
  const raw = String(value || "").trim();
  if (!raw) return fallback;

  if (raw.startsWith("/")) return raw;

  try {
    const parsed = new URL(raw);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      return parsed.toString();
    }
  } catch {
    return fallback;
  }

  return fallback;
}

