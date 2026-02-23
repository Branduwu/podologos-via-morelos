import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";
import { DeactivateServiceAction } from "./actions/deactivateServiceAction";
import { SafeDeleteServiceAction } from "./actions/safeDeleteServiceAction.jsx";
import { DeactivatePromotionAction } from "./actions/deactivatePromotionAction";
import { DeactivateSpecialistAction } from "./actions/deactivateSpecialistAction";
import { DeactivatePriceItemAction } from "./actions/deactivatePriceItemAction";
import { SafeDeletePromotionAction } from "./actions/safeDeletePromotionAction.jsx";
import { SafeDeleteSpecialistAction } from "./actions/safeDeleteSpecialistAction.jsx";
import { SafeDeletePriceItemAction } from "./actions/safeDeletePriceItemAction.jsx";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID || "yb71w9t5";
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "CMS Podologos Via Morelos",

  projectId,
  dataset,

  plugins: [
    structureTool({ title: "Contenido", structure }),
    visionTool({ name: "consultas", title: "Consultas" }),
  ],

  i18n: {
    locales: [{ id: "es", title: "Espanol" }],
  },

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      if (context.schemaType === "service") {
        const withoutDelete = prev.filter((action) => action.action !== "delete");
        return [DeactivateServiceAction, SafeDeleteServiceAction, ...withoutDelete];
      }
      if (context.schemaType === "promotion") {
        const withoutDelete = prev.filter((action) => action.action !== "delete");
        return [DeactivatePromotionAction, SafeDeletePromotionAction, ...withoutDelete];
      }
      if (context.schemaType === "specialistProfile") {
        const withoutDelete = prev.filter((action) => action.action !== "delete");
        return [DeactivateSpecialistAction, SafeDeleteSpecialistAction, ...withoutDelete];
      }
      if (context.schemaType === "priceItem") {
        const withoutDelete = prev.filter((action) => action.action !== "delete");
        return [DeactivatePriceItemAction, SafeDeletePriceItemAction, ...withoutDelete];
      }
      return prev;
    },
  },
});
