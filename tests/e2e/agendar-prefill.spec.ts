import { expect, test } from "@playwright/test";

test("precios multiproducto prefill en agendar", async ({ page }) => {
  await page.goto("/agendar?service=podologia&services=Callos%20y%20durezas&services=Tratamiento%20de%20u%C3%B1a%20encarnada&approxTotal=1100");

  await expect(page.locator("#service")).toHaveValue("podologia");
  await expect(page.locator("#quote-services")).toContainText("Callos y durezas");
  await expect(page.locator("#quote-services")).toContainText("Tratamiento de uña encarnada");
  await expect(page.locator("#quote-total")).toContainText("1,100");
});

test("especialista prefill en agendar", async ({ page }) => {
  await page.goto("/agendar?service=psicologia&specialist=especialista-demo&services=Psicologia");
  await expect(page.locator("#service")).toHaveValue("psicologia");
});

test("telefono invalido bloquea CTA", async ({ page }) => {
  await page.goto("/agendar?service=podologia");
  await page.fill("#name", "Paciente Demo");
  await page.fill("#phone", "0000000000");

  const sendBtn = page.locator("#send-whatsapp");
  await expect(sendBtn).toContainText("Completa los campos");
  await expect(page.locator("#phone-error")).toBeVisible();
});

