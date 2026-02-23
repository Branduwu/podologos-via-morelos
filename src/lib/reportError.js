export async function reportError(scope, error, extra = {}) {
  console.error(`[${scope}]`, error, extra);

  if (!import.meta.env.PROD) return;

  try {
    const sentry = await import("@sentry/astro");
    if (typeof sentry.captureException === "function") {
      sentry.captureException(error instanceof Error ? error : new Error(String(error)), {
        tags: { scope },
        extra,
      });
    }
  } catch {
    // noop
  }
}

