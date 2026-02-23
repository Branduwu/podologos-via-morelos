import {useDocumentOperation} from "sanity";

export function createDeactivateAction(config) {
  const {
    label = "Desactivar",
    doneLabel = "Desactivado",
    title = "Oculta este documento en la web sin eliminarlo.",
  } = config || {};

  return function DeactivateAction(props) {
    const {patch, publish} = useDocumentOperation(props.id, props.type);
    const isAlreadyInactive = props.published?.active === false || props.draft?.active === false;

    return {
      label: isAlreadyInactive ? doneLabel : label,
      title: isAlreadyInactive ? "Este documento ya esta desactivado." : title,
      tone: isAlreadyInactive ? "default" : "caution",
      disabled: isAlreadyInactive || patch.disabled || publish.disabled,
      onHandle: () => {
        patch.execute([{set: {active: false}}]);
        publish.execute();
        props.onComplete();
      },
    };
  };
}
