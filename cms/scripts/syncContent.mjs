import { execSync } from "node:child_process";
import { existsSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";

const mode = String(process.argv[2] || "pull").toLowerCase();
const hasConfirmFlag = process.argv.includes("--confirm-production");
const envConfirm = String(process.env.SANITY_SYNC_CONFIRM || "").toUpperCase() === "YES";

if (mode !== "pull" && mode !== "push") {
  console.error("[sync:content] Modo invalido. Usa: pull | push");
  process.exit(1);
}

const defaults = mode === "push"
  ? { from: "development", to: "production" }
  : { from: "production", to: "development" };

const fromDataset = process.env.SANITY_SYNC_FROM || defaults.from;
const toDataset = process.env.SANITY_SYNC_TO || defaults.to;
const keepFile = process.env.SANITY_SYNC_KEEP_FILE === "1";

if (fromDataset === toDataset) {
  console.error("[sync:content] SANITY_SYNC_FROM y SANITY_SYNC_TO no pueden ser iguales.");
  process.exit(1);
}

if (mode === "push" && !(hasConfirmFlag || envConfirm)) {
  console.error(
    "[sync:content] Operacion bloqueada: push hacia production requiere confirmacion.\n" +
      "Ejecuta: npm run sync:content:push -- --confirm-production"
  );
  process.exit(1);
}

const exportFile = resolve(process.cwd(), `.sanity-sync-${fromDataset}.tar.gz`);

const run = (command) => {
  execSync(command, {
    stdio: "inherit",
    shell: true,
  });
};

try {
  console.log(`[sync:content] Modo: ${mode}`);
  console.log(`[sync:content] Exportando ${fromDataset}...`);
  run(`npx sanity@latest dataset export ${fromDataset} "${exportFile}"`);

  console.log(`[sync:content] Importando a ${toDataset} con --replace...`);
  run(`npx sanity@latest dataset import "${exportFile}" ${toDataset} --replace`);

  if (!keepFile && existsSync(exportFile)) {
    unlinkSync(exportFile);
    console.log("[sync:content] Archivo temporal eliminado.");
  }

  console.log(`[sync:content] Listo: ${fromDataset} -> ${toDataset}`);
} catch (error) {
  console.error("[sync:content] Error durante la sincronizacion.");
  if (error instanceof Error) {
    console.error(error.message);
  }
  process.exit(1);
}
