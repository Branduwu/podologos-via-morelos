import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
const dir = path.join(process.cwd(), "tests", "artifacts", "screenshots");
fs.mkdirSync(dir, { recursive: true });

const routes = [
  { path: "/", name: "home" },
  { path: "/servicios", name: "servicios" },
  { path: "/precios", name: "precios" },
  { path: "/galeria", name: "galeria" },
  { path: "/nosotros", name: "nosotros" },
  { path: "/especialistas", name: "especialistas" },
  { path: "/promociones", name: "promociones" },
  { path: "/ubicacion", name: "ubicacion" },
  { path: "/agendar", name: "agendar" },
];

for (const route of routes) {
  test(`images: ${route.name}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(route.path, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    // Count broken images
    const broken = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll("img"));
      return imgs
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => ({ src: img.src, alt: img.alt, complete: img.complete, naturalWidth: img.naturalWidth }));
    });

    // Count "Sin imagen" text visible
    const sinImagen = await page.evaluate(() =>
      document.body.innerText.split("\n").filter((t) => t.includes("Sin imagen") || t.includes("Sin imagen")).length
    );

    // Total images
    const totalImgs = await page.evaluate(() => document.querySelectorAll("img").length);

    console.log(`[${route.name}] total imgs: ${totalImgs} | broken: ${broken.length} | 'Sin imagen': ${sinImagen}`);
    if (broken.length > 0) {
      console.log("  broken:", JSON.stringify(broken, null, 2));
    }

    await page.screenshot({
      path: path.join(dir, `imgs-${route.name}.png`),
      fullPage: true,
      animations: "disabled",
    });

    expect(sinImagen, `'Sin imagen' text visible on ${route.name}`).toBe(0);
  });
}
