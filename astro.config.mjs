// @ts-check
import { defineConfig } from 'astro/config';
import sentry from "@sentry/astro";

import tailwindcss from '@tailwindcss/vite';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || "https://fumipronc.vercel.app",
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [sentry({
    sourceMapsUploadOptions:
      process.env.SENTRY_AUTH_TOKEN &&
      process.env.SENTRY_ORG &&
      process.env.SENTRY_PROJECT
        ? {
            authToken: process.env.SENTRY_AUTH_TOKEN,
            org: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
          }
        : undefined,
  }), sitemap({
    i18n: {
      defaultLocale: "es",
      locales: {
        es: "es-US",
        en: "en-US",
      },
    },
  })],
  vite: {
    plugins: [tailwindcss()]
  }
});
