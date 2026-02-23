import { describe, expect, it } from "vitest";
import { buildAppointmentMessage, buildContactMessage, buildWhatsAppUrl } from "../../src/utils/whatsapp";

describe("whatsapp utils", () => {
  it("builds appointment message with selected services and total", () => {
    const message = buildAppointmentMessage({
      name: "Abraham",
      phone: "55 2538 8683",
      service: "Podologia",
      selectedServices: ["Callos y durezas", "Uña encarnada"],
      approxTotal: 1100,
      specialist: "Sin preferencia",
      date: "2026-02-23",
      time: "10:00",
      notes: "Dolor al caminar",
    });

    expect(message).toContain("Nombre: Abraham");
    expect(message).toContain("Telefono: 5525388683");
    expect(message).toContain("Servicios solicitados:");
    expect(message).toContain("1. Callos y durezas");
    expect(message).toContain("2. Uña encarnada");
    expect(message).toContain("Total aproximado:");
  });

  it("builds contact message", () => {
    const message = buildContactMessage({
      service: "Psicologia",
      reason: "Quiero informes",
    });
    expect(message).toContain("Servicio: Psicologia");
    expect(message).toContain("Motivo: Quiero informes");
  });

  it("builds wa.me URL encoded", () => {
    const url = buildWhatsAppUrl("Hola mundo", "+52 1 55 2538 8683");
    expect(url).toContain("https://wa.me/5215525388683");
    expect(url).toContain("text=Hola%20mundo");
  });
});

