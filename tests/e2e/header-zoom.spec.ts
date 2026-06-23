import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
const dir = path.join(process.cwd(), "tests", "artifacts", "screenshots");
fs.mkdirSync(dir, { recursive: true });

test("header desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  const header = await page.$("header");
  await header?.screenshot({ path: path.join(dir, "header-desktop.png"), animations: "disabled" });
});

test("header tablet", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/", { waitUntil: "networkidle" });
  const header = await page.$("header");
  await header?.screenshot({ path: path.join(dir, "header-tablet.png"), animations: "disabled" });
});

test("header mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  const header = await page.$("header");
  await header?.screenshot({ path: path.join(dir, "header-mobile.png"), animations: "disabled" });
});

test("header mobile menu open", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.click("[data-mobile-menu-button]");
  await page.waitForTimeout(300);
  const header = await page.$("header");
  await header?.screenshot({ path: path.join(dir, "header-mobile-menu.png"), animations: "disabled" });
});

test("header en desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en", { waitUntil: "networkidle" });
  const header = await page.$("header");
  await header?.screenshot({ path: path.join(dir, "header-en-desktop.png"), animations: "disabled" });
});
