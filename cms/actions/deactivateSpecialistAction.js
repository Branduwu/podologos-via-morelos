import {createDeactivateAction} from "./createDeactivateAction";

export const DeactivateSpecialistAction = createDeactivateAction({
  label: "Desactivar especialista",
  doneLabel: "Especialista desactivado",
  title: "Oculta este especialista en la web sin eliminarlo.",
});
