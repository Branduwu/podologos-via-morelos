import {createDeactivateAction} from "./createDeactivateAction";

export const DeactivateSpecialistAction = createDeactivateAction({
  label: "Desactivar técnico",
  doneLabel: "Técnico desactivado",
  title: "Oculta este técnico en la web sin eliminarlo.",
});
