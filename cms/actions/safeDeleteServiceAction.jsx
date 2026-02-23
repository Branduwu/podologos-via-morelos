import {createSafeDeleteAction} from "./createSafeDeleteAction.jsx";

export const SafeDeleteServiceAction = createSafeDeleteAction({
  label: "Borrar servicio",
  blockedTitle: "No se puede borrar este servicio",
  confirmMessage:
    "Se borrara el servicio de forma permanente. Esta accion no se puede deshacer. Deseas continuar?",
});
