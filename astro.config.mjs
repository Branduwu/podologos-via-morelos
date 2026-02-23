// @ts-check
import { defineConfig } from 'astro/config';
import sentry from "@sentry/astro";

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || "https://podologos-via-morelos.vercel.app",
  integrations: [
    sentry({
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
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
