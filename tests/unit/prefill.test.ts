import { describe, expect, it } from "vitest";
import { getPrefillFromUrl, normalizeServiceSlug } from "../../src/utils/prefill";

describe("prefill utils", () => {
  it("normalizes service slug aliases", () => {
    expect(normalizeServiceSlug("Roedores")).toBe("roedores");
    expect(normalizeServiceSlug("Control de cucarachas")).toBe("cucarachas");
    expect(normalizeServiceSlug("Tratamiento de termitas")).toBe("termitas");
    expect(normalizeServiceSlug("Chinches de cama")).toBe("chinches");
    expect(normalizeServiceSlug("Hormigas")).toBe("hormigas");
    expect(normalizeServiceSlug("Avispas y abejas")).toBe("avispas");
    expect(normalizeServiceSlug("Inspeccion preventiva")).toBe("inspeccion");
  });

  it("parses single service and specialist from URL", () => {
    const prefill = getPrefillFromUrl("https://demo.local/agendar?service=roedores&specialist=abc-123");
    expect(prefill.service).toBe("roedores");
    expect(prefill.specialist).toBe("abc-123");
  });

  it("parses multiple services and approx total", () => {
    const prefill = getPrefillFromUrl(
      "https://demo.local/agendar?service=termitas&services=Inspeccion&services=Tratamiento&priceIds=abc123&priceId=def456&approxTotal=950"
    );
    expect(prefill.service).toBe("termitas");
    expect(prefill.services).toEqual(["Inspeccion", "Tratamiento"]);
    expect(prefill.priceIds).toEqual(["abc123", "def456"]);
    expect(prefill.approxTotal).toBe(950);
  });

  it("parses manual whatsapp routing fields from URL", () => {
    const prefill = getPrefillFromUrl(
      "https://demo.local/agendar?service=general&routing=general&waNumber=17045550192&waMessage=Mensaje%20manual&waNumbers=17045550192&waNumbers=__none__&waMessages=Uno&waMessages=__none__"
    );
    expect(prefill.service).toBe("general");
    expect(prefill.routing).toBe("general");
    expect(prefill.waNumber).toBe("17045550192");
    expect(prefill.waMessage).toBe("Mensaje manual");
    expect(prefill.waNumbers).toEqual(["17045550192", ""]);
    expect(prefill.waMessages).toEqual(["Uno", ""]);
  });
});
