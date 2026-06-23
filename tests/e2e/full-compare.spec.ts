import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
const dir = path.join(process.cwd(), "tests", "artifacts", "screenshots");
fs.mkdirSync(dir, { recursive: true });

const pairs = [
  { es: "/contacto",     en: "/en/contacto"     },
  { es: "/nosotros",     en: "/en/nosotros"     },
  { es: "/ubicacion",    en: "/en/ubicacion"    },
  { es: "/faq",          en: "/en/faq"          },
  { es: "/especialistas",en: "/en/especialistas"},
  { es: "/promociones",  en: "/en/promociones"  },
];

for (const pair of pairs) {
  const name = pair.es.replace("/", "");
  for (const [lang, route] of [["es", pair.es], ["en", pair.en]]) {
    test(`${name}-${lang}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route, { waitUntil: "networkidle" });
      await page.waitForTimeout(400);
      await page.screenshot({
        path: path.join(dir, `full-${name}-${lang}.png`),
        fullPage: true,
        animations: "disabled",
      });
    });
  }
}
