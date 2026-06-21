import {createSafeDeleteAction} from "./createSafeDeleteAction.jsx";

export const SafeDeleteSpecialistAction = createSafeDeleteAction({
  label: "Borrar técnico",
  blockedTitle: "No se puede borrar este técnico",
  confirmMessage:
    "Se borrara el tecnico de forma permanente. Esta accion no se puede deshacer. Deseas continuar?",
});
