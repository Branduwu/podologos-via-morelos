import {createSafeDeleteAction} from "./createSafeDeleteAction.jsx";

export const SafeDeletePriceItemAction = createSafeDeleteAction({
  label: "Borrar precio",
  blockedTitle: "No se puede borrar este precio",
  confirmMessage:
    "Se borrara el precio de forma permanente. Esta accion no se puede deshacer. Deseas continuar?",
});
