import {createDeactivateAction} from "./createDeactivateAction";

export const DeactivatePriceItemAction = createDeactivateAction({
  label: "Desactivar precio",
  doneLabel: "Precio desactivado",
  title: "Oculta este precio en la web sin eliminarlo.",
});
