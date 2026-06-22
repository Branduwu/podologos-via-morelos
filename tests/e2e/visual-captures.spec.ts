import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const screenshotDir = path.join(process.cwd(), "tests", "artifacts", "screenshots");
fs.mkdirSync(screenshotDir, { recursive: true });

type CaptureCase = {
  name: string;
  route: string;
  fileName: string;
  viewport: { width: number; height: number };
  readySelector: string;
};

const captureCases: CaptureCase[] = [
  {
    name: "home desktop",
    route: "/",
    fileName: "ux-home-desktop.png",
    viewport: { width: 1440, height: 2200 },
    readySelector: "[data-hero-carousel]",
  },
  {
    name: "home mobile",
    route: "/",
    fileName: "ux-home-mobile.png",
    viewport: { width: 430, height: 2200 },
    readySelector: "[data-hero-carousel]",
  },
  {
    name: "servicios desktop",
    route: "/servicios",
    fileName: "ux-servicios-desktop.png",
    viewport: { width: 1440, height: 2200 },
    readySelector: "[data-service-card]",
  },
  {
    name: "precios desktop",
    route: "/precios",
    fileName: "ux-precios-desktop.png",
    viewport: { width: 1440, height: 2200 },
    readySelector: "#quote-builder",
  },
  {
    name: "precios mobile",
    route: "/precios",
    fileName: "ux-precios-mobile.png",
    viewport: { width: 430, height: 2200 },
    readySelector: "#quote-builder",
  },
  {
    name: "agendar desktop",
    route: "/agendar?service=roedores",
    fileName: "ux-agendar-desktop.png",
    viewport: { width: 1440, height: 2200 },
    readySelector: "#appointment-form",
  },
  {
    name: "agendar mobile",
    route: "/agendar?service=roedores",
    fileName: "ux-agendar-mobile.png",
    viewport: { width: 430, height: 2200 },
    readySelector: "#appointment-form",
  },
];

test.describe("visual capture refresh", () => {
  for (const capture of captureCases) {
    test(capture.name, async ({ page }) => {
      await page.setViewportSize(capture.viewport);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(capture.route, { waitUntil: "networkidle" });
      await page.locator(capture.readySelector).first().waitFor();
      await page.waitForTimeout(300);

      await page.screenshot({
        path: path.join(screenshotDir, capture.fileName),
        fullPage: true,
        animations: "disabled",
      });
    });
  }
});
