import {createSafeDeleteAction} from "./createSafeDeleteAction.jsx";

export const SafeDeleteSpecialistAction = createSafeDeleteAction({
  label: "Borrar especialista",
  blockedTitle: "No se puede borrar este especialista",
  confirmMessage:
    "Se borrara el especialista de forma permanente. Esta accion no se puede deshacer. Deseas continuar?",
});
