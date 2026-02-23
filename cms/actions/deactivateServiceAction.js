import { useDocumentOperation } from "sanity";

export function DeactivateServiceAction(props) {
  const { patch, publish } = useDocumentOperation(props.id, props.type);
  const isAlreadyInactive = props.published?.active === false || props.draft?.active === false;

  return {
    label: isAlreadyInactive ? "Servicio desactivado" : "Desactivar servicio",
    title: isAlreadyInactive
      ? "Este servicio ya esta desactivado."
      : "Oculta este servicio en la web sin eliminar el documento.",
    tone: isAlreadyInactive ? "default" : "caution",
    disabled: isAlreadyInactive || patch.disabled || publish.disabled,
    onHandle: () => {
      patch.execute([{ set: { active: false } }]);
      publish.execute();
      props.onComplete();
    },
  };
}
