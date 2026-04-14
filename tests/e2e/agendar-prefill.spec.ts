import { expect, test } from "@playwright/test";

test("precios multiproducto prefill en agendar no confia en total arbitrario", async ({ page }) => {
  await page.goto("/agendar?service=podologia&services=Callos%20y%20durezas&services=Tratamiento%20de%20u%C3%B1a%20encarnada&approxTotal=1");

  await expect(page.locator("#service")).toHaveValue("podologia");
  await expect(page.locator("#quote-services")).toContainText("Callos y durezas");
  await expect(page.locator("#quote-services")).toContainText("Tratamiento de uña encarnada");
  await expect(page.locator("#quote-total")).not.toContainText("$1");
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

test("waNumber externo en URL no cambia destino de WhatsApp", async ({ page }) => {
  const attackerNumber = "5215500000001";
  await page.goto(`/agendar?service=podologia&waNumber=${attackerNumber}&waMessage=Mensaje%20externo`);
  await page.fill("#name", "Paciente Demo");
  await page.fill("#phone", "55 2538 8683");

  const sendBtn = page.locator("#send-whatsapp");
  await expect(sendBtn).toHaveAttribute("href", /wa\.me\//);
  await expect(sendBtn).not.toHaveAttribute("href", new RegExp(attackerNumber));
  await expect(sendBtn).not.toHaveAttribute("href", /Mensaje%20externo/);
});
