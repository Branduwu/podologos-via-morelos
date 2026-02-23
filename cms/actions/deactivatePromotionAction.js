import {createDeactivateAction} from "./createDeactivateAction";

export const DeactivatePromotionAction = createDeactivateAction({
  label: "Desactivar promocion",
  doneLabel: "Promocion desactivada",
  title: "Oculta esta promocion en la web sin eliminarla.",
});
