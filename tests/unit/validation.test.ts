import { describe, expect, it } from "vitest";
import { formatDateMX, isSunday, isValidPhone, isValidPhoneInput, isWithinSchedule, sanitizePhone } from "../../src/utils/validation";

describe("validation utils", () => {
  it("sanitizePhone removes non-digits", () => {
    expect(sanitizePhone("+52 55-2538-8683")).toBe("525525388683");
  });

  it("validates phone length and blocks repeated digits", () => {
    expect(isValidPhone("5525388683")).toBe(true);
    expect(isValidPhone("0000000000")).toBe(false);
    expect(isValidPhone("111111111111")).toBe(false);
    expect(isValidPhone("12345")).toBe(false);
  });

  it("validates raw phone input characters", () => {
    expect(isValidPhoneInput("55 2538 8683")).toBe(true);
    expect(isValidPhoneInput("(55) 2538-8683")).toBe(true);
    expect(isValidPhoneInput("55abc")).toBe(false);
  });

  it("formats date in MX style", () => {
    expect(formatDateMX("2026-02-23")).toBe("23/02/2026");
    expect(formatDateMX(undefined)).toBe("Por definir");
  });

  it("detects Sunday and schedule boundaries", () => {
    expect(isSunday("2026-02-22")).toBe(true);
    expect(isSunday("2026-02-23")).toBe(false);

    expect(isWithinSchedule("2026-02-23", "10:00")).toBe(true); // Monday open
    expect(isWithinSchedule("2026-02-23", "18:00")).toBe(true);
    expect(isWithinSchedule("2026-02-23", "09:30")).toBe(false);
    expect(isWithinSchedule("2026-02-22", "12:00")).toBe(false); // Sunday closed
  });
});

