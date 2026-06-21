import { describe, expect, it } from "vitest";
import { buildAppointmentMessage, buildContactMessage, buildWhatsAppUrl } from "../../src/utils/whatsapp";

describe("whatsapp utils", () => {
  it("builds appointment message with selected services and total", () => {
    const message = buildAppointmentMessage({
      name: "Abraham",
      phone: "55 2538 8683",
      service: "Roedores",
      selectedServices: ["Inspección inicial", "Tratamiento con cebos"],
      approxTotal: 1100,
      specialist: "Sin preferencia",
      date: "2026-02-23",
      time: "10:00",
      notes: "Presencia de ratones en cocina",
    });

    expect(message).toContain("Nombre: Abraham");
    expect(message).toContain("Telefono: 5525388683");
    expect(message).toContain("Servicios solicitados:");
    expect(message).toContain("1. Inspección inicial");
    expect(message).toContain("2. Tratamiento con cebos");
    expect(message).toContain("Total aproximado:");
  });

  it("builds contact message", () => {
    const message = buildContactMessage({
      service: "Cucarachas",
      reason: "Quiero informes",
    });
    expect(message).toContain("Servicio: Cucarachas");
    expect(message).toContain("Quiero informes");
    expect(message).not.toContain("Servicio de interes:");
    expect(message).not.toContain("Consulta:");
  });

  it("sanitizes direct contact placeholder reasons", () => {
    const message = buildContactMessage({
      service: "Roedores",
      reason: "Hola soy [Nombre], quiero informes",
    });
    expect(message).toContain("Me gustaría solicitar un servicio de fumigación y saber más de sus precios.");
    expect(message).not.toContain("Consulta:");
  });

  it("builds wa.me URL encoded", () => {
    const url = buildWhatsAppUrl("Hola mundo", "+52 1 55 2538 8683");
    expect(url).toContain("https://wa.me/5215525388683");
    expect(url).toContain("text=Hola%20mundo");
  });
});
