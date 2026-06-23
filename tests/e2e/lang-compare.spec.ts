import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
const dir = path.join(process.cwd(), "tests", "artifacts", "screenshots");
fs.mkdirSync(dir, { recursive: true });

const pairs = [
  { es: "/", en: "/en" },
  { es: "/servicios", en: "/en/servicios" },
  { es: "/precios", en: "/en/precios" },
  { es: "/galeria", en: "/en/galeria" },
  { es: "/nosotros", en: "/en/nosotros" },
  { es: "/especialistas", en: "/en/especialistas" },
  { es: "/promociones", en: "/en/promociones" },
  { es: "/ubicacion", en: "/en/ubicacion" },
  { es: "/agendar", en: "/en/agendar" },
  { es: "/contacto", en: "/en/contacto" },
];

for (const pair of pairs) {
  const name = pair.es === "/" ? "home" : pair.es.replace("/", "");
  test(`compare ${name}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });

    await page.goto(pair.es, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(dir, `cmp-${name}-es.png`), fullPage: true, animations: "disabled" });

    const esText = await page.evaluate(() => document.body.innerText);

    // Check if EN page exists
    const resp = await page.goto(pair.en, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const enExists = resp?.status() !== 404;
    await page.screenshot({ path: path.join(dir, `cmp-${name}-en.png`), fullPage: true, animations: "disabled" });

    const enText = await page.evaluate(() => document.body.innerText);

    // Detect Spanish words leaking into EN
    const esLeaks = ["Solicitar servicio", "Técnicos", "Servicios", "Inicio", "Nosotros",
      "Ubicación", "Galería", "Precios", "Contáctanos", "Agendar", "Español"]
      .filter(w => enText.includes(w));

    // Detect English words leaking into ES
    const enLeaks = ["Request Service", "Technicians", "About Us", "Location", "Gallery",
      "Pricing", "Contact Us", "Schedule", "Book Now"]
      .filter(w => esText.includes(w));

    console.log(`[${name}] EN page exists: ${enExists}`);
    if (esLeaks.length) console.log(`  ⚠ ES leaks in EN page: ${esLeaks.join(", ")}`);
    if (enLeaks.length) console.log(`  ⚠ EN leaks in ES page: ${enLeaks.join(", ")}`);
    if (!esLeaks.length && !enLeaks.length) console.log(`  ✅ no obvious leaks`);
  });
}
