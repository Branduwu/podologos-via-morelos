import { describe, expect, it } from "vitest";
import { getPrefillFromUrl, normalizeServiceSlug } from "../../src/utils/prefill";

describe("prefill utils", () => {
  it("normalizes service slug aliases", () => {
    expect(normalizeServiceSlug("Optometria")).toBe("optica");
    expect(normalizeServiceSlug("Podologia clinica")).toBe("podologia");
    expect(normalizeServiceSlug("Psicologia")).toBe("psicologia");
    expect(normalizeServiceSlug("Quiropractica")).toBe("quiropractica");
  });

  it("parses single service and specialist from URL", () => {
    const prefill = getPrefillFromUrl("https://demo.local/agendar?service=podologia&specialist=abc-123");
    expect(prefill.service).toBe("podologia");
    expect(prefill.specialist).toBe("abc-123");
  });

  it("parses multiple services and approx total", () => {
    const prefill = getPrefillFromUrl(
      "https://demo.local/agendar?service=psicologia&services=Primera%20sesion&services=Terapia&approxTotal=950"
    );
    expect(prefill.service).toBe("psicologia");
    expect(prefill.services).toEqual(["Primera sesion", "Terapia"]);
    expect(prefill.approxTotal).toBe(950);
  });

  it("parses manual whatsapp routing fields from URL", () => {
    const prefill = getPrefillFromUrl(
      "https://demo.local/agendar?service=dentista&routing=general&waNumber=5215512345678&waMessage=Mensaje%20manual&waNumbers=5215512345678&waNumbers=__none__&waMessages=Uno&waMessages=__none__"
    );
    expect(prefill.service).toBe("dentista");
    expect(prefill.routing).toBe("general");
    expect(prefill.waNumber).toBe("5215512345678");
    expect(prefill.waMessage).toBe("Mensaje manual");
    expect(prefill.waNumbers).toEqual(["5215512345678", ""]);
    expect(prefill.waMessages).toEqual(["Uno", ""]);
  });
});
