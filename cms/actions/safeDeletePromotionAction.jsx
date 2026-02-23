import {createSafeDeleteAction} from "./createSafeDeleteAction.jsx";

export const SafeDeletePromotionAction = createSafeDeleteAction({
  label: "Borrar promocion",
  blockedTitle: "No se puede borrar esta promocion",
  confirmMessage:
    "Se borrara la promocion de forma permanente. Esta accion no se puede deshacer. Deseas continuar?",
});
