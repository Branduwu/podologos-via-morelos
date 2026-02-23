import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.PUBLIC_SENTRY_DSN,
  tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? process.env.PUBLIC_SENTRY_TRACES_SAMPLE_RATE ?? "0.1"),
});
