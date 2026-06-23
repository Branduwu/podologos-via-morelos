import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
const dir = path.join(process.cwd(), "tests", "artifacts", "screenshots");
fs.mkdirSync(dir, { recursive: true });

const pages = ["/", "/nosotros", "/precios", "/servicios", "/agendar"];
const viewports = [
  { name: "mobile", w: 390, h: 844 },
  { name: "tablet", w: 768, h: 1024 },
  { name: "desktop", w: 1440, h: 900 },
];

test.describe("layout check", () => {
  for (const vp of viewports) {
    for (const route of pages) {
      const label = route === "/" ? "home" : route.replace("/", "");
      test(`${label} ${vp.name}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.w, height: vp.h });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(route, { waitUntil: "networkidle" });
        await page.waitForTimeout(400);
        await page.screenshot({
          path: path.join(dir, `layout-${label}-${vp.name}.png`),
          fullPage: true,
          animations: "disabled",
        });
      });
    }
  }
});
