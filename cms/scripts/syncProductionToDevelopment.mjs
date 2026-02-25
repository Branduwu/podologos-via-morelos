import { execSync } from "node:child_process";
import { existsSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";

const fromDataset = process.env.SANITY_SYNC_FROM || "production";
const toDataset = process.env.SANITY_SYNC_TO || "development";
const keepFile = process.env.SANITY_SYNC_KEEP_FILE === "1";
const exportFile = resolve(process.cwd(), `.sanity-sync-${fromDataset}.tar.gz`);

const run = (command) => {
  execSync(command, {
    stdio: "inherit",
    shell: true,
  });
};

try {
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
